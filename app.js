const seenVocabulary = new Set();
const localVocabulary = vocabularySource.filter(([word]) => {
  if (excludedStudentWords.has(word)) return false;
  if (seenVocabulary.has(word)) return false;
  seenVocabulary.add(word);
  return true;
});
const externalVocabulary = Array.isArray(window.alexIeltsVocabularySource) ? window.alexIeltsVocabularySource : [];
const vocabulary = externalVocabulary.length >= 600 ? externalVocabulary : localVocabulary;

const TOTAL_DAYS = 30;
const WORDS_PER_DAY = 20;

const advancedCourseWords = new Set([
  "retain", "knowledgeable", "interact", "informative", "beneficial", "fascinating", "guidance", "curiosity",
  "variety", "logical", "punctuation", "relative", "passive", "proportion", "respectively", "approximately",
  "cooperate", "specific", "strategy", "discipline", "motivation", "efficient", "flexible", "academic",
  "performance", "assessment", "feedback", "correction", "revision", "memorise", "pronunciation", "intonation",
  "hesitation", "narrative", "impression", "critical", "analytical", "independent", "collaborative", "communication",
  "interaction", "participation", "engagement", "distraction", "platform", "innovation", "adolescent", "generation",
  "cooperation", "competition", "priority", "deadline", "assignment", "presentation", "counterargument", "relevant",
  "irrelevant", "convincing", "persuasive", "viewpoint", "perspective", "drawback", "consequence", "potential",
  "discourage", "promote", "enhance", "strengthen", "broaden", "cultivate", "maintain", "accomplish", "evaluate",
  "monitor", "supervise", "guideline", "boundary", "privacy", "security", "reliable", "misleading", "majority",
  "minority", "annual", "fluctuate", "represent", "indicate", "illustrate", "summarise", "curriculum", "syllabus",
  "complement", "agreement", "fragment", "transition", "coherence", "cohesion", "lexical", "fluency", "elaborate",
  "justify", "clarify", "paraphrase", "proofread", "consistency", "initiative",
]);

const commonDailyWords = new Set([
  "vocabulary", "accuracy", "structure", "complete", "subject", "verb", "object", "review", "habit", "regular",
  "apply", "method", "focus", "progress", "clear", "education", "knowledge", "culture", "identity", "interact",
  "adapt", "adjust", "admit", "aid", "ancient", "approve", "budget", "concentrate", "display", "feature",
  "guarantee", "labor", "link", "motivate", "native", "objective", "pattern", "predict", "primary", "react",
  "reject", "reveal", "significant", "vary", "visible", "account", "address", "appreciate", "aware", "bacteria",
  "breed", "burden", "calculate", "circulate", "collaborate", "comment", "comparison", "component", "continuous",
  "conventional", "cover", "crash", "creation", "crisis", "criticism", "delivery", "demanding", "destroy", "distract",
  "diversity", "donate", "drug", "dynamic", "elite", "employ", "engage", "enormous", "establish", "estimate",
  "environmental", "pollution", "habitat", "species", "climate", "urban", "rural", "transport", "population",
  "housing", "employment", "income", "poverty", "healthcare", "exercise", "lifestyle", "technology", "media",
  "consumer", "purchase", "economy", "tourism", "language", "creativity", "teamwork", "leadership", "responsibility",
  "evidence", "research", "survey", "experiment", "analysis", "solution", "policy", "volunteer", "charity", "crime",
  "punishment", "safety", "risk", "outcome", "attitude", "alternative", "awareness", "citizen", "conflict", "elderly",
  "equality", "household", "investment", "preserve", "previous", "survive", "temporary",
]);

const advancedVocabularyIndices = vocabulary
  .map((item, index) => ({ item, index }))
  .filter(({ item }) => {
    const [word, , , , , source = ""] = item;
    if (commonDailyWords.has(word)) return false;
    return source.includes("核心词汇") || source.includes("补充") || advancedCourseWords.has(word);
  })
  .map(({ index }) => index)
  .sort((left, right) => {
    const sourceRank = (index) => {
      const source = vocabulary[index][5] || "";
      if (source.includes("核心词汇")) return 0;
      if (source.includes("补充")) return 1;
      return 2;
    };
    return sourceRank(left) - sourceRank(right) || left - right;
  });

const state = JSON.parse(localStorage.getItem("alexIeltsCourseState") || "{}");
const requestedDay = Number(new URLSearchParams(window.location.search).get("day"));
state.day ||= 1;
if (Number.isInteger(requestedDay)) {
  state.day = requestedDay;
  window.history.replaceState({}, "", window.location.pathname);
}
state.day = Math.min(Math.max(state.day, 1), TOTAL_DAYS);
state.step ||= 0;
state.completedDays ||= [];
state.completedSteps ||= {};
state.ratings ||= {};
state.currentCard ||= 0;
state.streak ||= 0;
state.quizScores ||= {};
state.quizAnswers ||= {};
state.vocabScores ||= {};
state.vocabChoice ||= null;
state.vocabAttempt ||= null;
state.vocabSession ||= null;
state.historyDay ||= state.day;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function saveState() {
  localStorage.setItem("alexIeltsCourseState", JSON.stringify(state));
}

function outputKindForDay(day = state.day) {
  return day >= 29 || day % 2 === 0 ? "speaking" : "writing";
}

function draftKey(day = state.day) {
  return `draftDay${day}`;
}

function draftSavedAtKey(day = state.day) {
  return `draftSavedAtDay${day}`;
}

function draftInputId(day = state.day) {
  return `dailyDraft-day-${day}-${outputKindForDay(day)}`;
}

function draftStatusText(day = state.day) {
  const savedAt = state[draftSavedAtKey(day)];
  if (!savedAt) return "自动保存已开启";
  return `已自动保存 ${new Date(savedAt).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}`;
}

function saveDraftValue(value, day = state.day) {
  state[draftKey(day)] = value;
  state[draftSavedAtKey(day)] = new Date().toISOString();
  saveState();
  const status = document.querySelector(`[data-draft-status="${day}"]`);
  if (status) status.textContent = draftStatusText(day);
}

function backupFileName() {
  return `alex-ielts-record-day-${state.day}-${todayKey()}.json`;
}

function exportLearningRecord() {
  const payload = {
    app: "Alex IELTS Summer Lab",
    version: 1,
    exportedAt: new Date().toISOString(),
    state,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = backupFileName();
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  const status = $("#backupStatus");
  if (status) status.textContent = "已导出学习记录。";
}

function importLearningRecord(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const payload = JSON.parse(reader.result);
      if (payload?.app !== "Alex IELTS Summer Lab" || !payload?.state || typeof payload.state !== "object") {
        throw new Error("invalid backup");
      }
      localStorage.setItem("alexIeltsCourseState", JSON.stringify(payload.state));
      const status = $("#backupStatus");
      if (status) status.textContent = "导入成功，正在刷新。";
      window.location.reload();
    } catch {
      const status = $("#backupStatus");
      if (status) status.textContent = "导入失败：请选择 Alex IELTS 导出的记录文件。";
    }
  });
  reader.readAsText(file);
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function coursePosition() {
  const day = Math.min(Math.max(state.day, 1), TOTAL_DAYS);
  const weekIndex = Math.min(Math.floor((day - 1) / 7), courseWeeks.length - 1);
  const dayInWeek = ((day - 1) % 7) + 1;
  const week = courseWeeks[weekIndex];
  const phase = day <= 14 ? "语法冲刺" : day <= 21 ? "写作强化" : day <= 28 ? "听读真题" : "口语综合";
  return { day, weekIndex, dayInWeek, week, grammarPoint: week.grammar[dayInWeek - 1], phase };
}

function coursePositionFor(dayNumber) {
  const day = Math.min(Math.max(dayNumber, 1), TOTAL_DAYS);
  const weekIndex = Math.min(Math.floor((day - 1) / 7), courseWeeks.length - 1);
  const dayInWeek = ((day - 1) % 7) + 1;
  const week = courseWeeks[weekIndex];
  const phase = day <= 14 ? "语法冲刺" : day <= 21 ? "写作强化" : day <= 28 ? "听读真题" : "口语综合";
  return { day, weekIndex, dayInWeek, week, grammarPoint: week.grammar[dayInWeek - 1], phase };
}

function dailyWordIndicesFor(dayNumber) {
  const advancedStart = ((dayNumber - 1) * WORDS_PER_DAY) % advancedVocabularyIndices.length;
  return Array.from(
    { length: WORDS_PER_DAY },
    (_, index) => advancedVocabularyIndices[(advancedStart + index) % advancedVocabularyIndices.length],
  );
}

function dailyWords() {
  return dailyWordIndicesFor(state.day).map((index) => vocabulary[index]);
}

function dailyWordsFor(dayNumber) {
  return dailyWordIndicesFor(dayNumber).map((index) => vocabulary[index]);
}

function dailyWordIndices() {
  return dailyWordIndicesFor(state.day);
}

function seededRank(word, salt) {
  return [...word].reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 3), salt * 97) % 997;
}

function rotateReviewList(items, salt) {
  return [...items].sort((a, b) => seededRank(a[0], salt) - seededRank(b[0], salt));
}

function reviewWords() {
  const priority = Object.entries(state.ratings)
    .filter(([, rating]) => rating === "hard" || rating === "again")
    .map(([word]) => vocabulary.find((item) => item[0] === word))
    .filter(Boolean);
  const mastered = Object.entries(state.ratings)
    .filter(([, rating]) => rating === "easy")
    .map(([word]) => vocabulary.find((item) => item[0] === word))
    .filter(Boolean);
  const fallback = dailyWords();
  const priorityReview = rotateReviewList(priority, state.day).slice(0, 4);
  const masteredReview = rotateReviewList(mastered, state.day + 11).slice(0, 2);
  const seen = new Set();
  return [...priorityReview, ...masteredReview, ...fallback]
    .filter((word) => {
      if (seen.has(word[0])) return false;
      seen.add(word[0]);
      return true;
    })
    .slice(0, 6);
}

function reviewGrammarQuestions() {
  return [
    { q: "Which sentence is complete?", options: ["Because reading is useful.", "Reading is useful for students.", "Useful for students."], answer: 1 },
    { q: "Choose the correct number phrase.", options: ["70 billions", "70 billion", "70 billion people are"], answer: 1 },
    { q: "Choose the correct sentence boundary.", options: ["Advertising is good it helps children learn.", "Advertising is good. It helps children learn.", "Advertising good helps children learn."], answer: 1 },
  ];
}

function stepData() {
  const { week, grammarPoint, phase } = coursePosition();
  const mistake = alexMistakes[(state.day - 1) % alexMistakes.length];
  const prompt = writingPrompts[(state.day - 1) % writingPrompts.length];
  const review = reviewWords();
  const words = dailyWords();
  const reviewQuiz = reviewGrammarQuestions();
  const isSpeakingOutput = state.day >= 29 || state.day % 2 === 0;

  return [
    {
      type: "Warm-up",
      title: "复习",
      time: "10 min",
      render: () => `
        <p class="lead">先把昨天最容易忘的东西捞回来。已经标记“会了”的词也会抽查，避免假会。</p>
        <div class="mini-grid">
          <div class="callout">
            <strong>句子改错</strong>
            <span>${mistake.wrong}</span>
            <small>试着先自己改，再看答案。</small>
          </div>
          <div class="callout success">
            <strong>正确版本</strong>
            <span>${mistake.correct}</span>
            <small>${mistake.point}</small>
          </div>
        </div>
        <div class="review-head">
          <h4>优先复习词</h4>
          <span>包含不会词，也抽查已掌握词</span>
        </div>
        <div class="review-word-grid">
          ${(review.length ? review : words.slice(0, 6))
            .map(
              (word) => `
                <button type="button" data-jump-vocab="${word[0]}">
                  <strong>${word[0]}</strong>
                  <span>${word[1]}</span>
                  <small>${word[2]} · ${word[3]}</small>
                </button>`,
            )
            .join("")}
        </div>
        <h4>语法抽查</h4>
        <div class="quiz compact-quiz">
          ${reviewQuiz
            .map(
              (question, questionIndex) => `
                <div class="question">
                  <p>${question.q}</p>
                  ${question.options
                    .map((option, optionIndex) => `<button type="button" data-review-question="${questionIndex}" data-answer="${question.answer}" data-option="${optionIndex}">${option}</button>`)
                    .join("")}
                </div>`,
            )
            .join("")}
        </div>
      `,
    },
    {
      type: state.day <= 14 ? "Grammar" : "Lesson",
      title: grammarPoint,
      time: "20 min",
      render: () => `
        <p class="lead">${phase} · ${week.goal}</p>
        ${renderGrammarLesson(grammarPoint, week)}
        <div class="example-box">
          <p><strong>雅思场景：</strong>${week.ielts}</p>
          <p><strong>今日检查重点：</strong>${week.alexFocus}</p>
        </div>
      `,
    },
    {
      type: "Practice",
      title: "练习",
      time: "15 min",
      render: () => renderPractice(grammarPoint, mistake),
    },
    {
      type: isSpeakingOutput ? "Speaking" : "Writing",
      title: isSpeakingOutput ? "口语" : "写作",
      time: "20 min",
      render: () => (isSpeakingOutput ? renderSpeakingTask(prompt) : renderWritingTask(prompt)),
    },
    {
      type: "Vocabulary",
      title: "新单词",
      time: "15 min",
      render: () => `
        <p class="lead">最后背新词。每个词先做中文意思四选一，再做英文拼写；不能只凭感觉点“会”。</p>
        <div class="word-table">
          ${words
            .map(
              ([word, meaning, part, collocation, example]) => `
                <button type="button" data-jump-vocab="${word}">
                  <strong>${word}</strong>
                  <span>${meaning}</span>
                  <small>${part} · ${collocation}</small>
                  <em>${example}</em>
                </button>`,
            )
            .join("")}
        </div>
      `,
    },
  ];
}

function grammarExplanation(point) {
  const explanations = {
    主谓宾: "英语动作句的底层结构是 Subject + Verb + Object。Subject 是“谁/什么”，Verb 是“做什么”，Object 是“被影响的东西”。先不要急着写长句，先保证每个句子都有清楚的主语和动词。",
    主系表: "描述状态时常用 Subject + be/linking verb + adjective/noun，例如 Reading is useful.",
    "there be": "表示“有/存在”时用 there be，be 动词要跟后面的名词保持一致。",
    单复数和数字单位: "可数名词要注意单复数；具体数字后面的 million/billion/thousand 不加 s。Task 1 写数据时，这个错误很容易扣准确性分。",
    "可数/不可数": "可数名词有单复数；不可数名词不能随便加 s，例如 knowledge 和 evidence。",
    单复数: "具体数字后面的 million/billion/thousand 不加 s；普通可数名词复数要加 s。",
    数字单位: "写 Task 1 时，70 billion 是正确形式；billions of people 才加 s。",
    一般现在: "描述事实、习惯、观点用一般现在。第三人称单数动词要加 s。",
    一般现在和现在进行: "一般现在讲习惯和事实；现在进行讲正在发生的动作。写观点时多用一般现在，描述此刻练习时用现在进行。",
    现在进行: "描述正在发生的动作，用 am/is/are + doing。",
    一般过去: "过去时间发生的动作，用过去式。历史图表通常全篇统一用一般过去。",
    一般过去和过去进行: "一般过去讲过去发生了什么；过去进行讲过去某一刻正在发生什么。Task 1 如果图表年份已经过去，通常统一用一般过去。",
    过去进行: "描述过去某个时间正在进行的动作，用 was/were + doing。",
    现在完成: "过去发生但和现在有关，用 have/has + done。",
    现在完成进行: "从过去持续到现在的动作，用 have/has been doing。",
    过去完成: "过去的过去，用 had + done。",
    一般将来: "预测或计划可用 will / be going to，但 Task 1 不能乱预测未来。",
    完成时和将来时: "完成时强调过去到现在的联系；将来时表达预测或计划。注意 Task 1 只描述图里已有信息，不要自己预测未来。",
    简单句: "一个完整意思先写成一个简单句，准确比长更重要。",
    简单句与复合句: "简单句保证准确，复合句增加逻辑。先写准两个短句，再用 because/which/who 等连接。",
    并列句: "两个同等重要的句子用 and/but/so 连接，或拆成两句。",
    复合句: "一个主句加一个从句，必须保证主句本身完整。",
    句号和逗号: "写作要先养成句号习惯：一个意思结束就停。",
    "because/so": "because 给原因，so 给结果。不要在同一个句子里乱堆 because 和 so。",
    "however/therefore": "however 表转折，therefore 表结果，用来替代重复的 and。",
    原因状语从句: "because/when/if 等从句可以放前面或后面，但主句要完整。",
    原因和时间从句: "原因从句回答 why，时间从句回答 when。写作中先写主句，再补 because/when 从句，避免句子残缺。",
    时间状语从句: "when/after/before 引导时间关系，讲经历时很常用。",
    宾语从句: "I think that... / I believe that... 后面接完整句。",
    "that/what": "that 只连接，what 本身表示“什么/所...的东西”。",
    "why/because": "why 问原因，because 回答原因，不要写 the reason why... because...",
    "who 定语从句": "who 修饰人，例如 students who review mistakes。",
    定语从句: "定语从句用来解释前面的名词。who 修饰人，which 修饰物，that 可以修饰人或物。先保证被修饰的名词清楚。",
    "which 定语从句": "which 修饰物，例如 books which teach culture。",
    "that 定语从句": "that 可修饰人或物，口语和基础写作常用。",
    关系代词: "关系代词要指代前面的名词，不能随意替换。",
    非谓语基础: "doing/done/to do 可以简化句子，但先保证主句准确。",
    被动语态: "强调动作承受者，用 be + done，例如 books are written by authors。",
    "by 的用法": "被动语态中 by 引出动作执行者；不要把 by 和 with 混用。",
    比较级: "比较两者用 more/-er + than。",
    比较和趋势表达: "Task 1 需要比较数字和趋势：increase/decrease/remain stable/reach a peak；比较两组数据时用 while 或 in contrast。",
    最高级: "三者以上用 the most/-est。",
    趋势表达: "Task 1 常用 increase, decrease, remain stable, reach a peak。",
    对比表达: "In contrast / By contrast / while 用来比较不同数据或观点。",
    连接词和四段结构: "Task 2 先搭四段：开头、主体 1、主体 2、结尾。连接词要表示真实逻辑，例如 however 转折，therefore 结果，for example 举例。",
  };
  return explanations[point] || "今天把这个语法点放进雅思句子里练，先追求准确，再追求复杂。";
}

function renderPracticeBlock(questions) {
  const savedScore = state.quizScores[state.day];
  return `
    <p class="lead">完成 10 题后提交，系统会记录今天语法练习分数，家长看板可以看到。</p>
    <div class="score-result" id="quizScoreResult">${savedScore ? `已提交：${savedScore.correct}/${savedScore.total} · ${savedScore.percent}%` : "未提交"}</div>
    <div class="quiz">
      ${questions
        .map(
          (question, questionIndex) => `
            <div class="question">
              <p>${question.q}</p>
              ${question.options
                .map((option, optionIndex) => `<button type="button" data-question="${questionIndex}" data-answer="${question.answer}" data-option="${optionIndex}">${option}</button>`)
                .join("")}
            </div>`,
        )
        .join("")}
    </div>
    <button id="submitQuiz" class="submit-score" type="button">提交练习并计算分数</button>
    <div class="rewrite-box">
      <label for="rewriteInput">句子应用：</label>
      <p>用今天的语法点写 2 个自己的 IELTS 句子。</p>
      <textarea id="rewriteInput" rows="3" placeholder="Write two sentences here."></textarea>
    </div>
  `;
}

function renderPractice(point, mistake) {
  if (practiceBank[point]) {
    return renderPracticeBlock(practiceBank[point]);
  }
  if (focusPracticeBank[point]) {
    return renderPracticeBlock(focusPracticeBank[point]);
  }
  if (point.startsWith("Listening") || point.startsWith("Reading")) {
    return renderPracticeBlock(listeningReadingPractice);
  }
  if (point.startsWith("Speaking")) {
    return renderPracticeBlock(speakingPractice);
  }

  const questions =
    point === "主谓宾"
      ? [
          {
            q: "Which sentence is complete?",
            options: ["Because daily review is useful.", "Daily review helps students.", "Useful for students."],
            answer: 1,
          },
          {
            q: "Choose the sentence with clear subject + verb + object.",
            options: ["Students improve writing.", "Improve students writing.", "Writing students improve."],
            answer: 0,
          },
          {
            q: "Which sentence fixes the run-on sentence?",
            options: ["Advertising is good it helps children learn.", "Advertising is good. It helps children learn.", "Advertising good helps children learn."],
            answer: 1,
          },
          {
            q: "Choose the best object after the verb 'improve'.",
            options: ["The student improves.", "The student improves his grammar.", "The student grammar improves his."],
            answer: 1,
          },
          {
            q: "Which sentence has a clear verb?",
            options: ["Reading books useful.", "Reading books is useful.", "Reading books useful for students."],
            answer: 1,
          },
          {
            q: "Which sentence uses the verb 'help' correctly?",
            options: ["Vocabulary helps writing.", "Vocabulary helps students write better.", "Vocabulary help students writes better."],
            answer: 1,
          },
          {
            q: "Choose the best IELTS topic sentence.",
            options: ["Good.", "Daily vocabulary review can improve students' accuracy.", "Because vocabulary."],
            answer: 1,
          },
          {
            q: "Which sentence should be split into two sentences?",
            options: ["Reading is useful. It teaches students new ideas.", "Reading is useful it teaches students new ideas.", "Reading teaches students new ideas."],
            answer: 1,
          },
          {
            q: "Choose the correct sentence order.",
            options: ["Parents should guide children.", "Should guide parents children.", "Children parents should guide."],
            answer: 0,
          },
          {
            q: "Which sentence is ready for a Task 2 mini paragraph?",
            options: ["For example, can learn.", "Students can learn useful words from daily reading.", "Useful words from daily reading."],
            answer: 1,
          },
        ]
      : point === "主系表"
      ? [
          {
            q: "Which sentence uses subject + linking verb + complement?",
            options: ["Reading is useful.", "Reading improves vocabulary.", "Reading many books."],
            answer: 0,
          },
          {
            q: "Choose the correct be verb.",
            options: ["Books is informative.", "Books are informative.", "Books am informative."],
            answer: 1,
          },
          {
            q: "Which sentence sounds natural in IELTS Speaking?",
            options: ["My answer is clear.", "My answer clear.", "My answer has clear."],
            answer: 0,
          },
          {
            q: "Choose the correct linking verb sentence.",
            options: ["The task seems difficult.", "The task seems difficulty.", "The task seem difficult."],
            answer: 0,
          },
          {
            q: "Which complement is an adjective?",
            options: ["Reading is a habit.", "Reading is useful.", "Reading improves writing."],
            answer: 1,
          },
          {
            q: "Choose the best correction.",
            options: ["The book is knowledgeable.", "The book is informative.", "The book knowledge."],
            answer: 1,
          },
          {
            q: "Which sentence uses 'become' correctly?",
            options: ["My sentences become clearer.", "My sentences become clearly.", "My sentences becomes clearer."],
            answer: 0,
          },
          {
            q: "Choose the correct口语 answer opening.",
            options: ["Yes, reading is beneficial for students.", "Yes, because beneficial.", "Yes, reading beneficial."],
            answer: 0,
          },
          {
            q: "Which sentence has correct subject-verb agreement?",
            options: ["This method are effective.", "This method is effective.", "These method is effective."],
            answer: 1,
          },
          {
            q: "Choose the best complete sentence.",
            options: ["The idea sounds reasonable.", "The idea sounds reasonably.", "The idea reasonable sounds."],
            answer: 0,
          },
        ]
      : point === "there be"
      ? [
          {
            q: "Choose the correct sentence.",
            options: ["There is many reasons.", "There are many reasons.", "There be many reasons."],
            answer: 1,
          },
          {
            q: "Which sentence describes one change?",
            options: ["There was a sharp increase.", "There were a sharp increase.", "There had a sharp increase."],
            answer: 0,
          },
          {
            q: "Choose the correct past form.",
            options: ["There are 20 students in 2020.", "There was 20 students in 2020.", "There were 20 students in 2020."],
            answer: 2,
          },
          {
            q: "Which sentence avoids mixing there be and have?",
            options: ["There have many apps.", "There are many apps.", "There has many apps."],
            answer: 1,
          },
          {
            q: "Choose the correct sentence for a singular noun.",
            options: ["There is one main reason.", "There are one main reason.", "There were one main reason."],
            answer: 0,
          },
          {
            q: "Which sentence is suitable for Task 1?",
            options: ["There was an increase in app usage.", "There is increase app usage.", "There had increase in app usage."],
            answer: 0,
          },
          {
            q: "Choose the correct negative sentence.",
            options: ["There was no change in 2021.", "There were no change in 2021.", "There no was change in 2021."],
            answer: 0,
          },
          {
            q: "Which sentence uses plural agreement?",
            options: ["There was several benefits.", "There were several benefits.", "There is several benefits."],
            answer: 1,
          },
          {
            q: "Choose the better sentence.",
            options: ["The chart has a rise.", "There was a rise in the number of students.", "There were a rise in students."],
            answer: 1,
          },
          {
            q: "Which sentence uses there be with place/detail?",
            options: ["There are many useful words in the lesson.", "There many useful words in the lesson.", "There have many useful words in the lesson."],
            answer: 0,
          },
        ]
      : [
    {
      q: `Fix the sentence: ${mistake.wrong}`,
      options: [mistake.correct, mistake.wrong, "No change needed."],
      answer: 0,
    },
    {
      q: "Choose the complete sentence.",
      options: ["Because reading is useful.", "Reading is useful for students.", "Useful for students."],
      answer: 1,
    },
    {
      q: "Which sentence uses punctuation better?",
      options: ["Advertising is good it helps children learn.", "Advertising is good. It helps children learn.", "Advertising good helps children learn."],
      answer: 1,
    },
    {
      q: "Choose the correct number phrase.",
      options: ["70 billions", "70 billion", "70 billion of calls"],
      answer: 1,
    },
    {
      q: "Which sentence uses present perfect continuous correctly?",
      options: ["I study piano for 8 years.", "I have been studying piano for 8 years.", "I am study piano for 8 years."],
      answer: 1,
    },
    {
      q: "Choose the correct passive sentence.",
      options: ["Books are written by authors.", "Books are wrote by authors.", "Books wrote by authors."],
      answer: 0,
    },
    {
      q: "Which connector shows contrast?",
      options: ["Therefore", "In contrast", "For example"],
      answer: 1,
    },
    {
      q: "Choose the correct collocation.",
      options: ["interact me", "interact with me", "interact to me"],
      answer: 1,
    },
    {
      q: "Which sentence has a clear relative clause?",
      options: ["Students who review mistakes improve faster.", "Students that's review mistakes improve faster.", "Students review who mistakes improve faster."],
      answer: 0,
    },
    {
      q: "Which Task 1 sentence avoids predicting the future?",
      options: ["Mobile calls will increase after 2002.", "Mobile calls increased between 1995 and 2002.", "Maybe calls will be higher later."],
      answer: 1,
    },
  ];
  const savedScore = state.quizScores[state.day];

  return `
    <p class="lead">完成 10 题后提交，系统会记录今天语法练习分数，家长看板可以看到。</p>
    <div class="score-result" id="quizScoreResult">${savedScore ? `已提交：${savedScore.correct}/${savedScore.total} · ${savedScore.percent}%` : "未提交"}</div>
    <div class="quiz">
      ${questions
        .map(
          (question, questionIndex) => `
            <div class="question">
              <p>${question.q}</p>
              ${question.options
                .map((option, optionIndex) => `<button type="button" data-question="${questionIndex}" data-answer="${question.answer}" data-option="${optionIndex}">${option}</button>`)
                .join("")}
            </div>`,
        )
        .join("")}
    </div>
    <button id="submitQuiz" class="submit-score" type="button">提交练习并计算分数</button>
    <div class="rewrite-box">
      <label for="rewriteInput">把这个长句拆成两句：</label>
      <p>Advertising is good it helps children learn about the outside world.</p>
      <textarea id="rewriteInput" rows="3" placeholder="Advertising is good. It helps children learn about the outside world."></textarea>
    </div>
  `;
}

function renderShell() {
  const { day, weekIndex, dayInWeek, week } = coursePosition();
  const steps = stepData();
  const completed = state.completedSteps[day] || [];

  $("#streakDays").textContent = state.streak;
  $("#dayLabel").textContent = `Week ${weekIndex + 1} · Day ${dayInWeek}`;
  $("#absoluteDayLabel").textContent = `Day ${day}`;
  $("#heroTitle").textContent = week.title;
  $("#heroCopy").textContent = week.goal;
  $("#dayProgress").value = completed.length;
  $("#dayProgressText").textContent = `${completed.length}/${steps.length}`;
  $("#dayProgress").max = steps.length;

  $("#stepList").innerHTML = steps
    .map(
      (step, index) => `
        <button type="button" class="${index === state.step ? "active" : ""} ${completed.includes(index) ? "done" : ""}" data-step="${index}">
          <span>${index + 1}</span>
          <strong>${step.title}</strong>
          <small>${step.time}</small>
        </button>`,
    )
    .join("");

  const activeStep = steps[state.step] || steps[0];
  $("#activeStepType").textContent = activeStep.type;
  $("#activeStepTitle").textContent = activeStep.title;
  $("#activeStepTime").textContent = activeStep.time;
  $("#stepContent").innerHTML = activeStep.render();
  $("#prevStep").disabled = state.step === 0;
  $("#completeStep").textContent = state.step === steps.length - 1 ? "完成今天" : "完成并进入下一项";
  $("#prevDay").disabled = day === 1;
  $("#nextDay").disabled = day === TOTAL_DAYS;

  $("#roadmap").innerHTML = courseWeeks
    .map(
      (item, index) => `
        <button type="button" class="week-card ${index === weekIndex ? "active" : ""}" data-week="${index}">
          <strong>Week ${index + 1}</strong>
          <h4>${item.title}</h4>
          <p>${item.goal}</p>
        </button>`,
    )
    .join("");

  renderVocab();
  renderParentDashboard();
  renderHistory();
}

function vocabOptions(index) {
  const correct = vocabulary[index];
  const options = [{ label: correct[1], value: correct[1], correct: true }];
  for (const offset of [7, 13, 29, 43, 59]) {
    const meaning = vocabulary[(index + offset) % vocabulary.length][1];
    if (meaning && meaning !== correct[1] && !options.some((option) => option.label === meaning)) {
      options.push({ label: meaning, value: meaning, correct: false });
    }
    if (options.length === 3) break;
  }
  const shift = (state.day + index) % 3;
  const firstThree = options.slice(0, 3);
  return [...firstThree.slice(shift), ...firstThree.slice(0, shift), { label: "不会", value: "hard", correct: false, hard: true }];
}

function syncVocabSessionToIndex(index) {
  if (!state.vocabSession || state.vocabSession.finished) return;
  const word = vocabulary[index]?.[0];
  if (!word) return;
  if (state.vocabSession.mode === "new") {
    const newIndex = dailyWordIndices().indexOf(index);
    if (newIndex >= 0) state.vocabSession.index = newIndex;
    return;
  }
  const reviewIndex = state.vocabSession.reviewQueue.indexOf(word);
  if (reviewIndex >= 0) state.vocabSession.index = reviewIndex;
}

function ensureVocabSession() {
  if (!state.vocabSession || state.vocabSession.day !== state.day) {
    state.vocabSession = {
      day: state.day,
      mode: "new",
      index: 0,
      errors: {},
      reviewQueue: [],
      finished: false,
    };
    state.currentCard = dailyWordIndices()[0];
    state.vocabAttempt = null;
  }
  if (!state.vocabSession.finished) {
    const indices = dailyWordIndices();
    if (state.vocabSession.mode === "new") {
      state.currentCard = indices[Math.min(state.vocabSession.index, indices.length - 1)];
    } else {
      const word = state.vocabSession.reviewQueue[state.vocabSession.index];
      const index = vocabulary.findIndex((item) => item[0] === word);
      if (index >= 0) state.currentCard = index;
    }
  }
}

function resetVocabAttempt(word) {
  state.vocabAttempt = {
    word,
    meaningError: false,
    meaningHard: false,
    spellingError: false,
    meaningPassed: false,
    completed: false,
    scored: false,
  };
}

function markVocabError(word, type) {
  state.vocabSession ||= { day: state.day, mode: "new", index: 0, errors: {}, reviewQueue: [], finished: false };
  state.vocabSession.errors[word] ||= { meaning: false, spelling: false };
  state.vocabSession.errors[word][type] = true;
}

function advanceVocabSession() {
  ensureVocabSession();
  if (state.vocabSession.finished) return;
  if (state.vocabSession.mode === "new") {
    if (state.vocabSession.index < 19) {
      state.vocabSession.index += 1;
      state.currentCard = dailyWordIndices()[state.vocabSession.index];
      return;
    }
    state.vocabSession.reviewQueue = Object.keys(state.vocabSession.errors);
    if (state.vocabSession.reviewQueue.length) {
      state.vocabSession.mode = "review";
      state.vocabSession.index = 0;
      state.currentCard = vocabulary.findIndex((item) => item[0] === state.vocabSession.reviewQueue[0]);
      return;
    }
    state.vocabSession.finished = true;
    return;
  }
  if (state.vocabSession.index < state.vocabSession.reviewQueue.length - 1) {
    state.vocabSession.index += 1;
    state.currentCard = vocabulary.findIndex((item) => item[0] === state.vocabSession.reviewQueue[state.vocabSession.index]);
  } else {
    state.vocabSession.finished = true;
  }
}

function nextVocabLabel() {
  if (!state.vocabSession) return "下一词";
  if (state.vocabSession?.finished) return "今日词汇完成";
  if (state.vocabSession.mode === "new" && state.vocabSession.index === 19) {
    return Object.keys(state.vocabSession.errors || {}).length ? "进入错词二刷" : "完成词汇";
  }
  if (state.vocabSession.mode === "review" && state.vocabSession.index >= state.vocabSession.reviewQueue.length - 1) {
    return "完成词汇";
  }
  return "下一词";
}

function renderVocab(selectedWord) {
  ensureVocabSession();
  const wordIndex = selectedWord ? vocabulary.findIndex((item) => item[0] === selectedWord) : state.currentCard;
  const safeIndex = wordIndex >= 0 ? wordIndex : 0;
  state.currentCard = safeIndex % vocabulary.length;
  if (selectedWord) syncVocabSessionToIndex(state.currentCard);
  const [word, meaning, part, collocation, example, note] = vocabulary[state.currentCard];
  if (!state.vocabAttempt || state.vocabAttempt.word !== word || state.vocabAttempt.completed) {
    resetVocabAttempt(word);
  }

  if (state.vocabSession?.finished) {
    $("#cardStatus").textContent = "Today complete";
    $("#cardWord").textContent = "今日词汇完成";
    $("#cardBack").classList.add("hidden");
    $("#vocabChoices").innerHTML = "";
    $("#vocabFeedback").innerHTML = `<strong>20 个新词和错词二刷已完成。</strong><span>错过的词已经进入错词表，之后会继续抽查。</span>`;
    $(".flashcard").classList.remove("choice-mode", "spelling-mode", "feedback-mode");
    $(".flashcard").classList.add("submitted-mode");
    $("#spellingInput").disabled = true;
    $("#checkSpelling").disabled = true;
    $("#enterSpelling").disabled = true;
    $("#flipBackCard").disabled = true;
    $("#nextWord").disabled = true;
    return;
  }

  $("#cardWord").textContent = word;
  $("#cardMeaning").textContent = meaning;
  $("#cardMeta").textContent = `${part} · ${collocation}`;
  $("#cardExample").textContent = example;
  $("#cardNote").textContent = note;
  $("#cardStatus").textContent = state.ratings[word] ? "Review word" : "Daily word";
  $("#cardBack").classList.add("hidden");
  $("#spellingInput").value = "";
  $("#spellingResult").textContent = "";
  $("#vocabFeedback").innerHTML = "";
  $("#spellingPrompt").textContent = "";
  $(".flashcard").classList.remove("choice-mode", "spelling-mode", "feedback-mode", "submitted-mode");
  $(".flashcard").classList.add("choice-mode");
  $("#spellingInput").disabled = true;
  $("#checkSpelling").disabled = true;
  $("#enterSpelling").disabled = true;
  $("#flipBackCard").disabled = true;
  $("#nextWord").disabled = true;
  $("#nextWord").textContent = nextVocabLabel();
  const sessionLabel =
    state.vocabSession?.mode === "review"
      ? `错词二刷 ${state.vocabSession.index + 1}/${state.vocabSession.reviewQueue.length}`
      : `新词 ${state.vocabSession.index + 1}/20`;
  $("#cardStatus").textContent = sessionLabel;
  $("#vocabChoices").innerHTML = vocabOptions(state.currentCard)
    .map(
      (option) => `
        <button type="button" data-vocab-choice="${option.value}" data-vocab-correct="${option.correct}" data-vocab-hard="${option.hard || false}">
          ${option.label}
        </button>`,
    )
    .join("");

  const groups = { hard: [], again: [], easy: [] };
  for (const [wordKey, rating] of Object.entries(state.ratings)) {
    groups[rating]?.push(wordKey);
  }
  $("#hardWords").innerHTML = groups.hard.map((wordKey) => `<li>${wordKey}</li>`).join("");
  $("#againWords").innerHTML = groups.again.map((wordKey) => `<li>${wordKey}</li>`).join("");
  $("#easyWords").innerHTML = groups.easy.map((wordKey) => `<li>${wordKey}</li>`).join("");
  $("#queueCount").textContent = `${Object.keys(state.ratings).length} words`;
  $("#vocabSummary").innerHTML = `
    <div class="score-tile"><strong>${groups.hard.length}</strong><span>不会</span></div>
    <div class="score-tile"><strong>${groups.again.length}</strong><span>需复习</span></div>
    <div class="score-tile"><strong>${groups.easy.length}</strong><span>已掌握</span></div>
    <div class="score-tile"><strong>${state.vocabScores[state.day]?.percent ?? "--"}%</strong><span>今日词汇</span></div>
  `;

}

function renderParentDashboard() {
  const quizScores = Object.entries(state.quizScores)
    .map(([day, score]) => ({ day: Number(day), ...score }))
    .sort((a, b) => a.day - b.day);
  const vocabScores = Object.entries(state.vocabScores)
    .map(([day, score]) => ({ day: Number(day), ...score }))
    .sort((a, b) => a.day - b.day);
  const latestQuiz = quizScores[quizScores.length - 1];
  const latestVocab = vocabScores[vocabScores.length - 1];
  const completed = Object.values(state.completedSteps).reduce((sum, steps) => sum + steps.length, 0);
  const hardCount = Object.values(state.ratings).filter((rating) => rating === "hard").length;
  const againCount = Object.values(state.ratings).filter((rating) => rating === "again").length;
  const recordedDays = [
    ...Object.keys(state.completedSteps).map(Number),
    ...Object.keys(state.quizScores).map(Number),
    ...Object.keys(state.vocabScores).map(Number),
    ...Object.keys(state)
      .filter((key) => key.startsWith("draftDay"))
      .map((key) => Number(key.replace("draftDay", "")))
      .filter((day) => Number.isInteger(day)),
  ].filter((day) => Number.isInteger(day) && day >= 1);
  const maxRecordedDay = Math.min(TOTAL_DAYS, Math.max(1, ...recordedDays));
  const days = Array.from({ length: maxRecordedDay }, (_, index) => index + 1);

  $("#parentSummary").textContent = `Day ${state.day}`;
  $("#scoreGrid").innerHTML = `
    <div class="score-tile"><strong>${latestQuiz ? `${latestQuiz.percent}%` : "--"}</strong><span>最近语法练习</span></div>
    <div class="score-tile"><strong>${latestVocab ? `${latestVocab.percent}%` : "--"}</strong><span>最近词汇拼写</span></div>
    <div class="score-tile"><strong>${completed}</strong><span>累计完成步骤</span></div>
    <div class="score-tile"><strong>${hardCount + againCount}</strong><span>待复习词</span></div>
  `;
  $("#scoreBoard").innerHTML = days
    .map((day) => {
      const quiz = state.quizScores[day];
      const vocab = state.vocabScores[day];
      const steps = state.completedSteps[day]?.length || 0;
      return `
        <div class="score-row">
          <strong>Day ${day}</strong>
          <span>语法：${quiz ? `${quiz.correct}/${quiz.total}` : "--"}</span>
          <span>词汇：${vocab ? `${vocab.correct}/${vocab.total}` : "--"}</span>
          <span>完成：${steps}/5</span>
        </div>`;
    })
    .join("");
  $("#savedDrafts").innerHTML =
    days
      .map((day) => {
        const draft = state[draftKey(day)];
        if (!draft) return "";
        return `
          <details class="draft-item">
            <summary>Day ${day} ${day % 2 ? "写作" : "口语"}内容</summary>
            <button class="copy-draft ghost" type="button" data-copy-draft="${day}">复制</button>
            <p>${escapeHtml(draft)}</p>
          </details>`;
      })
      .join("") || `<p class="empty-note">还没有保存写作或口语内容。</p>`;
}

function renderHistory() {
  const maxDay = Math.min(TOTAL_DAYS, Math.max(state.day, ...Object.keys(state.completedSteps).map(Number), ...Object.keys(state.quizScores).map(Number), 1));
  state.historyDay = Math.min(Math.max(state.historyDay || state.day, 1), maxDay);
  const days = Array.from({ length: maxDay }, (_, index) => index + 1);
  $("#historyDays").innerHTML = days
    .map(
      (day) => `
        <button type="button" class="${day === state.historyDay ? "active" : ""}" data-history-day="${day}">
          <strong>Day ${day}</strong>
          <span>${state.completedSteps[day]?.length || 0}/5</span>
        </button>`,
    )
    .join("");

  const { week, grammarPoint, phase } = coursePositionFor(state.historyDay);
  const quiz = state.quizScores[state.historyDay];
  const vocab = state.vocabScores[state.historyDay];
  const draft = state[draftKey(state.historyDay)];
  const words = dailyWordsFor(state.historyDay).slice(0, 20);
  const errors =
    state.vocabSession?.day === state.historyDay
      ? Object.entries(state.vocabSession.errors || {}).map(([word, flags]) => ({ word, flags }))
      : [];

  $("#historyTitle").textContent = `Day ${state.historyDay}`;
  $("#historyStatus").textContent = state.completedSteps[state.historyDay]?.length === 5 ? "completed" : "record";
  $("#historyContent").innerHTML = `
    <div class="history-section">
      <h4>当天内容</h4>
      <div class="history-cards">
        <div><strong>${phase}</strong><span>${week.title}</span></div>
        <div><strong>语法</strong><span>${grammarPoint}</span></div>
        <div><strong>${state.historyDay % 2 ? "写作" : "口语"}</strong><span>${writingPrompts[(state.historyDay - 1) % writingPrompts.length]}</span></div>
      </div>
    </div>
    <div class="history-section">
      <h4>分数</h4>
      <div class="history-cards">
        <div><strong>练习</strong><span>${quiz ? `${quiz.correct}/${quiz.total} · ${quiz.percent}%` : "未提交"}</span></div>
        <div><strong>词汇</strong><span>${vocab ? `${vocab.correct}/${vocab.total} · ${vocab.percent}%` : "未记录"}</span></div>
      </div>
    </div>
    <div class="history-section">
      <h4>新单词</h4>
      <div class="history-word-list">${words.map((word) => `<span>${word[0]}</span>`).join("")}</div>
    </div>
    <div class="history-section">
      <h4>当天错词</h4>
      ${
        errors.length
          ? `<div class="history-word-list">${errors
              .map((item) => `<span>${item.word}${item.flags.meaning ? " · 意思" : ""}${item.flags.spelling ? " · 拼写" : ""}</span>`)
              .join("")}</div>`
          : `<p class="empty-note">没有记录到当天错词，或当天还未完成词汇练习。</p>`
      }
    </div>
    <div class="history-section">
      <h4>保存内容</h4>
      ${draft ? `<p class="history-draft">${draft}</p>` : `<p class="empty-note">当天还没有保存写作/口语内容。</p>`}
    </div>
  `;
}

function updateVocabScore(isCorrect) {
  state.vocabScores[state.day] ||= { correct: 0, total: 0, percent: 0, date: todayKey() };
  state.vocabScores[state.day].total += 1;
  if (isCorrect) {
    state.vocabScores[state.day].correct += 1;
  }
  const score = state.vocabScores[state.day];
  score.percent = Math.round((score.correct / score.total) * 100);
}

function completeCurrentStep() {
  const { day } = coursePosition();
  const steps = stepData();
  if (state.step === steps.length - 1 && !state.vocabSession?.finished) {
    const message = "请先完成 20 个新词；如果有错词，还需要完成错词二刷。";
    const result = $("#spellingResult");
    if (result) result.textContent = message;
    return;
  }
  state.completedSteps[day] ||= [];
  if (!state.completedSteps[day].includes(state.step)) {
    state.completedSteps[day].push(state.step);
  }

  if (state.step < steps.length - 1) {
    state.step += 1;
  } else {
    const key = todayKey();
    if (!state.completedDays.includes(key)) {
      state.completedDays.push(key);
      state.streak += 1;
    }
    if (state.day < TOTAL_DAYS) {
      state.day += 1;
      state.step = 0;
    }
  }
  saveState();
  renderShell();
}

$$(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    $$(".tab").forEach((item) => item.classList.remove("active"));
    $$(".view").forEach((view) => view.classList.remove("active"));
    tab.classList.add("active");
    $(`#${tab.dataset.view}`).classList.add("active");
  });
});

document.addEventListener("click", (event) => {
  const copyButton = event.target.closest("[data-copy-draft]");
  if (copyButton) {
    const day = Number(copyButton.dataset.copyDraft);
    const draft = state[draftKey(day)] || "";
    const label = day % 2 ? "写作" : "口语";
    copyText(`Day ${day} ${label}内容\n\n${draft}`)
      .then(() => {
        copyButton.textContent = "已复制";
        setTimeout(() => {
          copyButton.textContent = "复制";
        }, 1200);
      })
      .catch(() => {
        copyButton.textContent = "复制失败";
      });
    return;
  }

  const stepButton = event.target.closest("[data-step]");
  if (stepButton) {
    state.step = Number(stepButton.dataset.step);
    saveState();
    renderShell();
  }

  const questionButton = event.target.closest("[data-question]");
  if (questionButton) {
    const questionIndex = questionButton.dataset.question;
    state.quizAnswers[state.day] ||= {};
    state.quizAnswers[state.day][questionIndex] = Number(questionButton.dataset.option);
    questionButton.parentElement.querySelectorAll("button").forEach((button) => button.classList.remove("selected", "correct", "wrong"));
    questionButton.classList.add("selected");
    saveState();
  }

  const reviewButton = event.target.closest("[data-review-question]");
  if (reviewButton) {
    const isCorrect = reviewButton.dataset.option === reviewButton.dataset.answer;
    reviewButton.parentElement.querySelectorAll("button").forEach((button) => button.classList.remove("correct", "wrong"));
    reviewButton.classList.add(isCorrect ? "correct" : "wrong");
  }

  const ratingButton = event.target.closest("[data-rating]");
  if (ratingButton) {
    const [word] = vocabulary[state.currentCard];
    state.ratings[word] = ratingButton.dataset.rating;
    state.currentCard = (state.currentCard + 1) % vocabulary.length;
    saveState();
    renderVocab();
  }

  const vocabChoice = event.target.closest("[data-vocab-choice]");
  if (vocabChoice) {
    const [word] = vocabulary[state.currentCard];
    state.vocabAttempt ||= {};
    if (state.vocabAttempt.word !== word) resetVocabAttempt(word);
    document.querySelectorAll("[data-vocab-choice]").forEach((button) => button.classList.remove("selected", "wrong"));
    vocabChoice.classList.add("selected");
    const isHard = vocabChoice.dataset.vocabHard === "true";
    const meaningCorrect = vocabChoice.dataset.vocabCorrect === "true";
    state.vocabChoice = { word, meaningCorrect, isHard };
    $("#cardBack").classList.remove("hidden");
    if (!meaningCorrect) {
      state.vocabAttempt.meaningError = true;
      if (isHard) state.vocabAttempt.meaningHard = true;
      markVocabError(word, "meaning");
      state.ratings[word] = "hard";
      vocabChoice.classList.add("wrong");
      document.querySelector('[data-vocab-correct="true"]')?.classList.add("correct");
      $("#vocabFeedback").innerHTML = `<strong>正确答案：${vocabulary[state.currentCard][1]}</strong><span>${isHard ? "你选择了不会。" : "这个选项不对。"}请点击正确选项后，再进入拼写。</span>`;
      $("#spellingResult").textContent = "请先选正确意思。";
      $("#enterSpelling").disabled = true;
      saveState();
    } else {
      state.vocabAttempt.meaningPassed = true;
      vocabChoice.classList.add("correct");
      $(".flashcard").classList.remove("choice-mode");
      $(".flashcard").classList.add("feedback-mode");
      $("#enterSpelling").disabled = false;
      $("#spellingPrompt").textContent = "";
      $("#vocabFeedback").innerHTML = `
        <strong>${state.vocabAttempt.meaningError ? "已改对" : "选对了"}：${vocabulary[state.currentCard][1]}</strong>
        <span>${vocabulary[state.currentCard][2]} · ${vocabulary[state.currentCard][3]}</span>
      `;
      $("#spellingResult").textContent = "";
      saveState();
    }
  }

  const vocabButton = event.target.closest("[data-jump-vocab]");
  if (vocabButton) {
    state.vocabChoice = null;
    state.vocabAttempt = null;
    renderVocab(vocabButton.dataset.jumpVocab);
    saveState();
    $$(".tab").find((tab) => tab.dataset.view === "vocab").click();
  }

  const weekButton = event.target.closest("[data-week]");
  if (weekButton) {
    state.day = Number(weekButton.dataset.week) * 7 + 1;
    state.step = 0;
    saveState();
    renderShell();
    $$(".tab").find((tab) => tab.dataset.view === "today").click();
  }

  const historyButton = event.target.closest("[data-history-day]");
  if (historyButton) {
    state.historyDay = Number(historyButton.dataset.historyDay);
    saveState();
    renderHistory();
  }

  if (event.target.id === "saveDraft") {
    const draftInput = document.querySelector("[data-draft-input]");
    saveDraftValue(draftInput?.value || "", state.day);
    event.target.textContent = "已保存";
    setTimeout(() => {
      event.target.textContent = "手动保存";
    }, 1200);
  }

  if (event.target.id === "submitQuiz") {
    const questions = [...document.querySelectorAll("[data-question]")];
    const total = new Set(questions.map((button) => button.dataset.question)).size;
    let correct = 0;
    for (let index = 0; index < total; index += 1) {
      const selected = state.quizAnswers[state.day]?.[index];
      const answerButton = document.querySelector(`[data-question="${index}"][data-answer]`);
      const answer = Number(answerButton?.dataset.answer);
      const selectedButton = document.querySelector(`[data-question="${index}"][data-option="${selected}"]`);
      if (selected === answer) {
        correct += 1;
        selectedButton?.classList.add("correct");
      } else {
        selectedButton?.classList.add("wrong");
        document.querySelector(`[data-question="${index}"][data-option="${answer}"]`)?.classList.add("correct");
      }
    }
    const percent = Math.round((correct / total) * 100);
    state.quizScores[state.day] = { correct, total, percent, date: todayKey(), point: coursePosition().grammarPoint };
    saveState();
    $("#quizScoreResult").textContent = `本次得分：${correct}/${total} · ${percent}%`;
    renderParentDashboard();
  }
});

document.addEventListener("input", (event) => {
  const draftInput = event.target.closest("[data-draft-input]");
  if (!draftInput) return;
  const day = Number(draftInput.dataset.draftDay) || state.day;
  saveDraftValue(draftInput.value, day);
  renderParentDashboard();
  if (state.historyDay === day) renderHistory();
});

$("#checkSpelling").addEventListener("click", () => {
  const [word] = vocabulary[state.currentCard];
  const typed = $("#spellingInput").value.trim().toLowerCase();
  const spellingCorrect = typed === word.toLowerCase();
  const meaningCorrect = state.vocabChoice?.word === word && state.vocabChoice.meaningCorrect;
  state.vocabAttempt ||= {};
  if (!spellingCorrect) {
    state.vocabAttempt.spellingError = true;
    markVocabError(word, "spelling");
    state.ratings[word] = "hard";
    $("#spellingResult").textContent = `拼写错误。正确拼写：${word}。请重新输入正确拼写。`;
    $("#spellingInput").value = "";
    $("#spellingInput").disabled = false;
    $("#checkSpelling").disabled = false;
    $("#nextWord").disabled = true;
    $("#spellingInput").focus();
    saveState();
    renderParentDashboard();
    return;
  }
  const cleanPass = Boolean(meaningCorrect && !state.vocabAttempt.meaningError && !state.vocabAttempt.spellingError);
  state.vocabAttempt.completed = true;
  if (!state.vocabAttempt.scored) {
    updateVocabScore(cleanPass);
    state.vocabAttempt.scored = true;
  }
  state.ratings[word] = cleanPass ? "easy" : state.vocabAttempt.meaningHard ? "hard" : "again";
  $("#spellingResult").textContent = cleanPass
    ? "正确。"
    : "已改正。";
  $(".flashcard").classList.remove("spelling-mode");
  $(".flashcard").classList.add("submitted-mode");
  $("#flipBackCard").disabled = false;
  $("#checkSpelling").disabled = true;
  $("#spellingInput").disabled = true;
  $("#nextWord").disabled = false;
  $("#nextWord").textContent = nextVocabLabel();
  saveState();
  renderParentDashboard();
});
$("#enterSpelling").addEventListener("click", () => {
  const [word] = vocabulary[state.currentCard];
  if (state.vocabChoice?.word !== word) return;
  $(".flashcard").classList.remove("choice-mode", "feedback-mode");
  $(".flashcard").classList.add("spelling-mode");
  $("#spellingInput").disabled = false;
  $("#checkSpelling").disabled = false;
  $("#enterSpelling").disabled = true;
  $("#flipBackCard").disabled = true;
  $("#spellingPrompt").textContent = `中文意思：${vocabulary[state.currentCard][1]}。请拼写英文单词。`;
  $("#spellingResult").textContent = "";
  $("#spellingInput").focus();
});
$("#flipBackCard").addEventListener("click", () => {
  $(".flashcard").classList.remove("spelling-mode");
  $(".flashcard").classList.add("submitted-mode");
  $("#cardBack").classList.remove("hidden");
});
$("#nextWord").addEventListener("click", () => {
  if (!state.vocabAttempt?.completed) {
    $("#spellingResult").textContent = "请先完成本词。";
    return;
  }
  advanceVocabSession();
  state.vocabChoice = null;
  state.vocabAttempt = null;
  saveState();
  renderVocab();
});
$("#completeStep").addEventListener("click", completeCurrentStep);
$("#prevStep").addEventListener("click", () => {
  state.step = Math.max(0, state.step - 1);
  saveState();
  renderShell();
});
$("#prevDay").addEventListener("click", () => {
  state.day = Math.max(1, state.day - 1);
  state.step = 0;
  state.historyDay = state.day;
  state.vocabSession = null;
  state.vocabChoice = null;
  state.vocabAttempt = null;
  saveState();
  renderShell();
});
$("#nextDay").addEventListener("click", () => {
  state.day = Math.min(TOTAL_DAYS, state.day + 1);
  state.step = 0;
  state.historyDay = state.day;
  state.vocabSession = null;
  state.vocabChoice = null;
  state.vocabAttempt = null;
  saveState();
  renderShell();
});
$("#resetDay").addEventListener("click", () => {
  const { day } = coursePosition();
  state.completedSteps[day] = [];
  state.step = 0;
  saveState();
  renderShell();
});
$("#exportState").addEventListener("click", exportLearningRecord);
$("#importState").addEventListener("click", () => $("#importStateFile").click());
$("#importStateFile").addEventListener("change", (event) => {
  importLearningRecord(event.target.files?.[0]);
  event.target.value = "";
});

renderShell();
