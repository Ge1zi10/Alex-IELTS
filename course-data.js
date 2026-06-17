// Course content for Alex IELTS.
// Replace this file to reuse the learning engine with another curriculum.

const courseWeeks = [
  {
    title: "句子骨架与基础准确性",
    goal: "第一周把句子写准：句子骨架、单复数、八大时态和句号断句。",
    grammar: ["主谓宾", "主系表", "there be", "单复数和数字单位", "一般现在和现在进行", "一般过去和过去进行", "完成时和将来时"],
    ielts: "Part 1 三句回答；Task 1 基础数据句。",
    alexFocus: "many good teachers / 70 billion / line had / 句号断句",
  },
  {
    title: "从句、被动与雅思句型",
    goal: "第二周学会把句子连接起来：从句、被动、比较、连接词和写作句型。",
    grammar: ["简单句与复合句", "原因和时间从句", "宾语从句", "定语从句", "被动语态", "比较和趋势表达", "连接词和四段结构"],
    ielts: "Part 3 观点 + 原因 + 例子；Task 2 原因段。",
    alexFocus: "why/because 混用 / who study / books are written / In contrast",
  },
  {
    title: "写作强化与真题输出",
    goal: "第三周把语法放进 Task 1/Task 2：概述、数据细节、观点段、讨论段和连贯性。",
    grammar: ["Task 1 overview", "Task 1 details", "Task 2 opinion", "Task 2 discussion", "Coherence", "Lexical resource", "Writing review"],
    ielts: "Task 1 图表小报告；Task 2 主体段与四段结构。",
    alexFocus: "overview / data details / topic sentence / supporting example",
  },
  {
    title: "听力阅读真题能力",
    goal: "第四周进入剑桥真题题型：听力填空、地图、学术讨论、讲座，以及阅读定位和判断。",
    grammar: ["Listening forms", "Listening maps", "Listening discussion", "Listening lecture", "Reading skimming", "Reading matching", "Reading T/F/NG"],
    ielts: "Listening Section 1-4；Reading matching, T/F/NG, sentence completion。",
    alexFocus: "one word only / numbers / spelling / paraphrase / locating keywords",
  },
  {
    title: "口语与综合模拟",
    goal: "最后两天先强化口语 Part 1/2，之后可继续扩展到 Part 3、整套写作和模拟复盘。",
    grammar: ["Speaking Part 1", "Speaking Part 2", "Speaking Part 3", "Mixed review", "Mock writing", "Mock speaking", "Final review"],
    ielts: "Speaking Part 1-3；写作与词汇综合复盘。",
    alexFocus: "direct answer / details / examples / fluency / pronunciation",
  },
];

const alexMistakes = [
  {
    wrong: "many goods teachers",
    correct: "many good teachers",
    point: "形容词 good 不加 s；goods 是名词“商品”。",
  },
  {
    wrong: "70 billions",
    correct: "70 billion",
    point: "具体数字 + million/billion/thousand 时，单位不加 s。",
  },
  {
    wrong: "I study piano for 8 years.",
    correct: "I have been studying the piano for 8 years.",
    point: "从过去持续到现在，用现在完成进行时。",
  },
  {
    wrong: "interact me",
    correct: "interact with me",
    point: "interact 是不及物动词，后面接 with。",
  },
  {
    wrong: "reading is the book is knowledgeable",
    correct: "Reading is more informative.",
    point: "避免重复 is；用一个清楚的主系表结构。",
  },
  {
    wrong: "Advertising is good it helps children learn.",
    correct: "Advertising is good. It helps children learn.",
    point: "两个完整意思之间要用句号或连接词。",
  },
  {
    wrong: "line have",
    correct: "line had",
    point: "过去图表用过去时；主语 line 是单数。",
  },
  {
    wrong: "For contract",
    correct: "In contrast",
    point: "contrast 是“对比”；contract 是“合同”。",
  },
];

const writingPrompts = [
  "Task 2 mini paragraph: Should students review vocabulary every day? Write 6-8 accurate sentences. Focus on subject + verb + object.",
  "Speaking Part 1: Do you like reading books? Give a direct answer, one reason, and one example. Use be verbs and linking verbs accurately.",
  "Task 1 mini report: Describe a small chart about learning apps. Use there is/there are/there was/there were accurately.",
  "Speaking Part 2: Describe a useful teacher. Use plural nouns and number phrases accurately.",
  "Task 2 body paragraph: Explain why regular practice improves English. Use present simple and present continuous carefully.",
  "Speaking Part 3: Why did online learning become popular? Use past simple and past continuous in your answer.",
  "Task 1 mini report: Describe a past-to-now learning habit. Use present perfect and future forms carefully.",
  "Speaking Part 1: Do you prefer short answers or longer answers? Combine simple and complex sentences.",
  "Task 2 body paragraph: Explain why students improve when they review mistakes. Use because/when/after clauses.",
  "Speaking Part 3: Do you think parents know that children need guidance online? Use object clauses.",
  "Task 2 mini paragraph: Describe the kind of teacher who helps students improve. Use relative clauses.",
  "Speaking Part 2: Describe a book that was written by a famous author. Use passive voice naturally.",
  "Task 1 mini report: Compare two study methods. Use comparison and trend language.",
  "Speaking Part 3: Should schools teach exam skills and real communication? Use connectors and a clear four-part answer.",
  "Task 1: Write an overview for a line chart about study app use. Mention the main trend and the biggest change.",
  "Task 1: Write data details comparing app use and textbook use. Include numbers and comparison language.",
  "Task 2: Write an opinion paragraph about whether students should use learning apps every day.",
  "Task 2: Write a discussion paragraph about online learning and classroom learning.",
  "Task 2: Rewrite a paragraph to improve coherence. Use however, therefore, for example, and in addition.",
  "Writing: Upgrade one paragraph by replacing vague words with precise IELTS vocabulary.",
  "Writing review: Edit yesterday's paragraph for grammar, spelling, punctuation, and paragraph structure.",
  "Listening Section 1: Practise form completion. Focus on names, phone numbers, dates, prices, and spelling.",
  "Listening Section 2: Practise map and place descriptions. Focus on left/right, opposite, next to, entrance, and facilities.",
  "Listening Section 3: Practise academic discussion. Identify opinions, agreement, disagreement, and suggestions.",
  "Listening Section 4: Practise lecture notes. Listen for topic words, examples, processes, and signposting.",
  "Reading: Practise skimming. Find the main idea of each paragraph before answering questions.",
  "Reading: Practise matching headings and information. Use keywords and paraphrases.",
  "Reading: Practise True/False/Not Given. Separate text evidence from your own opinion.",
  "Speaking Part 1: Answer daily-life questions with answer, reason, and example.",
  "Speaking Part 2: Describe a book, teacher, or learning experience for one minute using notes.",
];

const vocabularySource = [
  ["vocabulary", "词汇", "noun", "review vocabulary", "Daily review helps students remember vocabulary.", "Day 1 写作主题词。"],
  ["accuracy", "准确性", "noun", "improve accuracy", "Accurate sentences improve writing accuracy.", "IELTS grammar accuracy 相关。"],
  ["structure", "结构", "noun", "sentence structure", "A clear sentence structure helps readers follow the idea.", "写作先看结构是否清楚。"],
  ["complete", "完整的", "adjective/verb", "a complete sentence", "A complete sentence needs a subject and a verb.", "也可作动词：complete a task。"],
  ["subject", "主语；主题", "noun", "the subject of a sentence", "The subject tells us who or what the sentence is about.", "语法课核心词。"],
  ["verb", "动词", "noun", "choose the correct verb", "A sentence needs a clear verb.", "语法课核心词。"],
  ["object", "宾语；物体", "noun", "the object of a sentence", "The object receives the action in a sentence.", "语法课核心词。"],
  ["review", "复习；回顾", "verb/noun", "review mistakes", "Students should review new words regularly.", "可作动词也可作名词。"],
  ["habit", "习惯", "noun", "develop a habit", "Daily review can become a useful learning habit.", "教育类大作文常用。"],
  ["effective", "有效的", "adjective", "an effective method", "Regular practice is an effective way to learn grammar.", "可替换 useful。"],
  ["regular", "规律的；定期的", "adjective", "regular practice", "Regular practice helps students make progress.", "搭配 practice/review。"],
  ["retain", "记住；保留", "verb", "retain information", "Students retain vocabulary better when they review it.", "比 remember 更正式。"],
  ["apply", "应用", "verb", "apply a rule", "Learners should apply grammar rules in writing.", "学完规则要应用。"],
  ["method", "方法", "noun", "a learning method", "A clear method makes revision easier.", "教育类通用词。"],
  ["focus", "专注；重点", "noun/verb", "focus on accuracy", "Students should focus on accuracy before writing long sentences.", "后面常接 on。"],
  ["progress", "进步", "noun/verb", "make progress", "Small daily tasks help students make progress.", "不可数名词为主。"],
  ["confidence", "信心", "noun", "build confidence", "Correct sentences can build confidence in writing.", "口语和写作都常用。"],
  ["express", "表达", "verb", "express an idea", "Grammar helps students express ideas clearly.", "名词是 expression。"],
  ["clear", "清楚的", "adjective", "a clear idea", "A clear sentence is easier to understand.", "简单但高频。"],
  ["organise", "组织；安排", "verb", "organise ideas", "Students need to organise ideas before writing.", "英式拼写，IELTS 可用。"],
  ["education", "教育", "noun", "receive education", "Education helps children understand society.", "不可数为主。"],
  ["knowledge", "知识", "noun", "gain knowledge", "Reading helps students gain knowledge.", "不可数名词。"],
  ["knowledgeable", "知识渊博的", "adjective", "be knowledgeable about", "A good teacher is knowledgeable about the subject.", "不要用来直接形容 reading。"],
  ["culture", "文化", "noun", "learn about culture", "Books can teach students about culture.", "口语报告里出现过的亮点词。"],
  ["identity", "身份；认同", "noun", "cultural identity", "Language is part of cultural identity.", "适合教育和文化话题。"],
  ["interact", "互动", "verb", "interact with", "Students interact with classmates after school.", "必须接 with。"],
  ["informative", "信息量大的", "adjective", "an informative book", "An informative book can teach useful facts.", "可替换 interesting。"],
  ["beneficial", "有益的", "adjective", "be beneficial for", "Reading is beneficial for teenagers.", "可替换 useful。"],
  ["fascinating", "迷人的", "adjective", "a fascinating story", "The novel tells a fascinating story.", "可替换 interesting。"],
  ["author", "作者", "noun", "a famous author", "The book was written by a famous author.", "注意发音和拼写。"],
  ["advertising", "广告业；广告", "noun", "advertising to children", "Advertising to children can be controversial.", "不可数为主。"],
  ["ban", "禁止", "verb/noun", "ban advertisements", "Some people think schools should ban junk food ads.", "被动：should be banned。"],
  ["guidance", "引导", "noun", "parental guidance", "Children need parental guidance.", "不可数名词。"],
  ["outside world", "外部世界", "phrase", "learn about the outside world", "Advertising can help children learn about the outside world.", "教育和广告话题可用。"],
  ["curiosity", "好奇心", "noun", "develop curiosity", "Good lessons develop students' curiosity.", "不是 variousity。"],
  ["variety", "多样性", "noun", "a variety of", "A variety of examples makes an essay stronger.", "词汇多样性用 lexical variety。"],
  ["logical", "有逻辑的", "adjective", "a logical structure", "A logical structure improves the essay.", "对应段落结构。"],
  ["paragraph", "段落", "noun", "write four paragraphs", "Task 2 should have clear paragraphs.", "大作文必须分段。"],
  ["punctuation", "标点", "noun", "use punctuation", "Punctuation helps readers understand long ideas.", "写作中要用清楚的句号和逗号。"],
  ["sentence", "句子", "noun", "a complete sentence", "A complete sentence needs a subject and a verb.", "先写完整句。"],
  ["clause", "从句；分句", "noun", "a relative clause", "A relative clause gives extra information.", "从句周会用到。"],
  ["relative", "关系的", "adjective", "relative clause", "Students who review mistakes improve faster.", "定语从句关键词。"],
  ["passive", "被动的", "adjective", "passive voice", "Books are written by authors.", "Week 7 重点。"],
  ["compare", "比较", "verb", "compare A with B", "The essay compares books with television.", "Task 1/2 都常用。"],
  ["proportion", "比例", "noun", "the proportion of", "The proportion of mobile calls increased.", "Task 1 高频。"],
  ["respectively", "分别地", "adverb", "A and B were 30% and 40%, respectively.", "用于两个数据对应。"],
  ["approximately", "大约", "adverb", "approximately 50%", "The figure was approximately 50%.", "Task 1 数据词。"],
  ["peak", "顶峰", "noun/verb", "reach a peak", "The number reached a peak in 2002.", "Task 1 高频搭配。"],
  ["stable", "稳定的", "adjective", "remain stable", "The figure remained stable.", "和 remain 搭配。"],
  ["short-term", "短期的", "adjective", "short-term fun", "TV may only provide short-term fun.", "来自老师建议。"],
  ["long-term", "长期的", "adjective", "long-term benefits", "Reading has long-term benefits.", "和 short-term 对比。"],
  ["cooperate", "合作", "verb", "cooperate with others", "Students learn to cooperate with others.", "口语 Part 2 可用。"],
  ["specific", "具体的", "adjective", "specific examples", "Specific examples make answers stronger.", "写作和口语都需要具体例子。"],
  ["support", "支持", "verb/noun", "support an opinion", "Examples support an opinion.", "论证必备词。"],
  ["opinion", "观点", "noun", "give an opinion", "He gives a clear opinion in the essay.", "Task 2 核心。"],
  ["reason", "原因", "noun", "give a reason", "The main reason is convenience.", "Part 3 常用。"],
  ["example", "例子", "noun", "give an example", "For example, students can review words daily.", "不要只说观点。"],
  ["conclusion", "结论", "noun", "draw a conclusion", "The conclusion should repeat the main opinion.", "四段结构最后一段。"],
  ["approach", "方法；途径", "noun", "a practical approach", "A practical approach helps students learn faster.", "可替换 method。"],
  ["strategy", "策略", "noun", "a learning strategy", "A good strategy can improve exam performance.", "学习和考试高频。"],
  ["routine", "常规；惯例", "noun", "a daily routine", "A daily routine makes revision easier.", "适合学习习惯话题。"],
  ["discipline", "自律；纪律", "noun", "self-discipline", "Self-discipline is important for language learning.", "教育类高频。"],
  ["motivation", "动力", "noun", "strong motivation", "Motivation helps students continue practising.", "口语和写作都常用。"],
  ["efficient", "高效的", "adjective", "an efficient way", "Online tools can make revision more efficient.", "和 effective 区分。"],
  ["flexible", "灵活的", "adjective", "a flexible schedule", "Online learning gives students a flexible schedule.", "教育科技话题高频。"],
  ["convenient", "方便的", "adjective", "a convenient tool", "Learning apps are convenient for daily review.", "口语常用。"],
  ["practical", "实用的", "adjective", "practical skills", "Schools should teach practical communication skills.", "教育类好用。"],
  ["academic", "学术的", "adjective", "academic performance", "Reading can improve academic performance.", "学校话题。"],
  ["performance", "表现；成绩", "noun", "improve performance", "Regular practice can improve exam performance.", "考试话题。"],
  ["assessment", "评估", "noun", "regular assessment", "Regular assessment helps teachers understand progress.", "教育类正式词。"],
  ["feedback", "反馈", "noun", "give feedback", "Clear feedback helps students correct mistakes.", "老师话题高频。"],
  ["correction", "纠正", "noun", "error correction", "Correction is useful when students understand the reason.", "语法学习。"],
  ["revision", "复习", "noun", "daily revision", "Daily revision helps learners retain vocabulary.", "英式常用。"],
  ["memorise", "记忆", "verb", "memorise new words", "Students should memorise words in context.", "英式拼写。"],
  ["context", "语境", "noun", "learn in context", "Words are easier to remember in context.", "背词核心概念。"],
  ["meaning", "意思", "noun", "understand the meaning", "Students need to understand the meaning before spelling.", "词汇学习。"],
  ["spelling", "拼写", "noun", "check spelling", "Spelling matters in writing accuracy.", "词汇模块核心。"],
  ["pronunciation", "发音", "noun", "improve pronunciation", "Reading aloud can improve pronunciation.", "口语模块。"],
  ["intonation", "语调", "noun", "natural intonation", "Natural intonation makes speech easier to follow.", "口语提升。"],
  ["hesitation", "犹豫；停顿", "noun", "reduce hesitation", "Practice can reduce hesitation in speaking.", "口语流利度。"],
  ["response", "回答；反应", "noun", "give a response", "A clear response includes an answer and a reason.", "口语 Part 1。"],
  ["detail", "细节", "noun", "add details", "Specific details make speaking answers stronger.", "口语写作都需要。"],
  ["description", "描述", "noun", "give a description", "A good description includes examples and feelings.", "Part 2 常用。"],
  ["narrative", "叙述", "noun", "a clear narrative", "A clear narrative helps listeners follow a story.", "Part 2 讲故事。"],
  ["experience", "经历；经验", "noun", "personal experience", "Personal experience makes an answer more natural.", "口语高频。"],
  ["memory", "记忆", "noun", "a strong memory", "This book left a strong memory.", "Part 2 可用。"],
  ["impression", "印象", "noun", "make an impression", "A helpful teacher can make a strong impression.", "人物描述。"],
  ["character", "性格；角色", "noun", "a main character", "The main character is brave and curious.", "书籍话题。"],
  ["plot", "情节", "noun", "an interesting plot", "The plot is simple but fascinating.", "书籍话题。"],
  ["chapter", "章节", "noun", "the first chapter", "The first chapter introduces the main character.", "阅读话题。"],
  ["theme", "主题", "noun", "the main theme", "The main theme of the book is friendship.", "书籍和写作。"],
  ["moral", "寓意；道德的", "noun/adjective", "a moral lesson", "Stories often teach a moral lesson.", "书籍描述。"],
  ["creative", "有创造力的", "adjective", "creative thinking", "Reading can develop creative thinking.", "教育话题。"],
  ["imagination", "想象力", "noun", "develop imagination", "Books help children develop imagination.", "阅读话题。"],
  ["critical", "批判性的；关键的", "adjective", "critical thinking", "Schools should develop critical thinking.", "教育类高分词。"],
  ["analytical", "分析性的", "adjective", "analytical skills", "Writing charts builds analytical skills.", "Task 1。"],
  ["independent", "独立的", "adjective", "independent learning", "Independent learning is useful for teenagers.", "教育话题。"],
  ["collaborative", "合作的", "adjective", "collaborative learning", "Collaborative learning helps students share ideas.", "学校话题。"],
  ["communication", "交流", "noun", "communication skills", "Schools should teach communication skills.", "口语和教育。"],
  ["interaction", "互动", "noun", "face-to-face interaction", "Face-to-face interaction can improve speaking.", "在线学习对比。"],
  ["participation", "参与", "noun", "class participation", "Class participation builds confidence.", "学校话题。"],
  ["engagement", "参与度", "noun", "student engagement", "Games can increase student engagement.", "教育科技。"],
  ["attention", "注意力", "noun", "pay attention", "Short videos may reduce students' attention.", "媒体话题。"],
  ["distraction", "干扰；分心", "noun", "avoid distractions", "Phones can be a distraction during study.", "学习习惯。"],
  ["screen time", "屏幕时间", "noun", "limit screen time", "Parents should limit children's screen time.", "科技教育。"],
  ["device", "设备", "noun", "digital devices", "Digital devices are common in modern classrooms.", "科技话题。"],
  ["platform", "平台", "noun", "online platform", "An online platform can provide flexible lessons.", "在线学习。"],
  ["resource", "资源", "noun", "learning resources", "The internet provides many learning resources.", "教育科技。"],
  ["access", "获取；入口", "noun/verb", "access information", "Students can access information quickly online.", "科技教育。"],
  ["available", "可获得的", "adjective", "available online", "Many free resources are available online.", "资源话题。"],
  ["digital", "数字的", "adjective", "digital learning", "Digital learning is becoming more common.", "科技话题。"],
  ["traditional", "传统的", "adjective", "traditional classrooms", "Traditional classrooms offer direct interaction.", "对比话题。"],
  ["modern", "现代的", "adjective", "modern education", "Modern education often uses technology.", "教育话题。"],
  ["innovation", "创新", "noun", "educational innovation", "Innovation can make lessons more engaging.", "科技教育。"],
  ["development", "发展", "noun", "personal development", "Reading supports children's development.", "教育大作文。"],
  ["teenager", "青少年", "noun", "teenagers and children", "Teenagers need both freedom and guidance.", "青少年话题。"],
  ["adolescent", "青少年", "noun/adjective", "adolescent learners", "Adolescent learners need practical support.", "更正式。"],
  ["generation", "一代人", "noun", "younger generations", "Younger generations use technology daily.", "社会话题。"],
  ["society", "社会", "noun", "modern society", "Education prepares children for society.", "Task 2 高频。"],
  ["community", "社区；群体", "noun", "local community", "Schools are important in the local community.", "社会教育。"],
  ["relationship", "关系", "noun", "build relationships", "Group work helps students build relationships.", "学校话题。"],
  ["cooperation", "合作", "noun", "encourage cooperation", "Team projects encourage cooperation.", "学校话题。"],
  ["competition", "竞争", "noun", "healthy competition", "Healthy competition can motivate students.", "教育话题。"],
  ["pressure", "压力", "noun", "exam pressure", "Too much exam pressure can harm students.", "考试话题。"],
  ["stress", "压力", "noun", "reduce stress", "Regular planning can reduce stress.", "学习生活。"],
  ["balance", "平衡", "noun/verb", "keep a balance", "Students should keep a balance between study and rest.", "生活话题。"],
  ["well-being", "幸福感；身心健康", "noun", "student well-being", "Schools should care about student well-being.", "教育话题。"],
  ["mental", "心理的", "adjective", "mental health", "Mental health is important for teenagers.", "健康教育。"],
  ["physical", "身体的", "adjective", "physical health", "Exercise improves physical health.", "健康话题。"],
  ["activity", "活动", "noun", "outdoor activities", "Outdoor activities help students relax.", "生活口语。"],
  ["schedule", "日程", "noun", "a study schedule", "A clear schedule helps students manage time.", "学习计划。"],
  ["priority", "优先事项", "noun", "set priorities", "Students should set priorities during exams.", "学习策略。"],
  ["deadline", "截止日期", "noun", "meet a deadline", "Planning helps students meet deadlines.", "学习任务。"],
  ["assignment", "作业；任务", "noun", "complete an assignment", "Students should complete assignments on time.", "学校话题。"],
  ["project", "项目", "noun", "a group project", "A group project can teach cooperation.", "学校话题。"],
  ["presentation", "展示；演讲", "noun", "give a presentation", "Presentations can improve speaking confidence.", "学校口语。"],
  ["debate", "辩论", "noun/verb", "join a debate", "Debates help students express opinions.", "学校活动。"],
  ["argument", "论点；争论", "noun", "a strong argument", "A strong argument needs evidence.", "写作核心。"],
  ["counterargument", "反方论点", "noun", "address a counterargument", "Good essays address a counterargument.", "大作文进阶。"],
  ["claim", "主张", "noun/verb", "make a claim", "Each claim should be supported by evidence.", "写作论证。"],
  ["supporting detail", "支持细节", "noun", "add supporting details", "Supporting details make a paragraph clearer.", "段落写作。"],
  ["relevant", "相关的", "adjective", "relevant examples", "Relevant examples support the main idea.", "写作评分。"],
  ["irrelevant", "不相关的", "adjective", "irrelevant information", "Irrelevant information weakens an essay.", "写作提醒。"],
  ["convincing", "有说服力的", "adjective", "a convincing argument", "Specific examples make an argument convincing.", "写作高频。"],
  ["persuasive", "有说服力的", "adjective", "a persuasive essay", "A persuasive essay has clear reasons.", "大作文。"],
  ["balanced", "平衡的", "adjective", "a balanced view", "A balanced view considers both sides.", "讨论类作文。"],
  ["viewpoint", "观点", "noun", "different viewpoints", "Essays often compare different viewpoints.", "可替换 opinion。"],
  ["perspective", "角度；观点", "noun", "from another perspective", "From another perspective, online learning saves time.", "高级连接。"],
  ["advantage", "优点", "noun", "a clear advantage", "Convenience is a clear advantage of online learning.", "利弊作文。"],
  ["disadvantage", "缺点", "noun", "a major disadvantage", "A major disadvantage is lack of interaction.", "利弊作文。"],
  ["drawback", "缺点", "noun", "a serious drawback", "One drawback of apps is distraction.", "可替换 disadvantage。"],
  ["beneficial", "有益的", "adjective", "beneficial to students", "Feedback is beneficial to students.", "同义词复现。"],
  ["harmful", "有害的", "adjective", "harmful effects", "Too much screen time may have harmful effects.", "观点类。"],
  ["positive", "积极的", "adjective", "positive effects", "Reading has positive effects on children.", "影响类。"],
  ["negative", "消极的", "adjective", "negative effects", "Excessive screen time can have negative effects.", "影响类。"],
  ["impact", "影响", "noun/verb", "have an impact on", "Technology has an impact on education.", "高频搭配。"],
  ["effect", "影响；效果", "noun", "a positive effect", "Practice has a positive effect on accuracy.", "impact/effect 区分。"],
  ["cause", "导致；原因", "noun/verb", "cause problems", "Lack of practice can cause grammar problems.", "原因类。"],
  ["result", "结果", "noun/verb", "result in", "Regular review can result in better memory.", "结果类。"],
  ["consequence", "后果", "noun", "serious consequences", "Poor planning can have serious consequences.", "正式词。"],
  ["factor", "因素", "noun", "an important factor", "Motivation is an important factor in learning.", "原因分析。"],
  ["aspect", "方面", "noun", "one aspect of education", "Grammar is one aspect of language learning.", "写作框架。"],
  ["issue", "问题；议题", "noun", "a social issue", "Screen time is an important issue for parents.", "议论文。"],
  ["challenge", "挑战", "noun", "a major challenge", "Keeping focus is a major challenge.", "同义词复现。"],
  ["difficulty", "困难", "noun", "face difficulty", "Students may face difficulty with grammar.", "学习问题。"],
  ["barrier", "障碍", "noun", "language barrier", "A limited vocabulary can be a barrier.", "正式词。"],
  ["opportunity", "机会", "noun", "learning opportunities", "The internet creates new learning opportunities.", "教育科技。"],
  ["potential", "潜力", "noun/adjective", "learning potential", "Technology has great potential in education.", "科技话题。"],
  ["benefit", "好处；受益", "noun/verb", "benefit students", "Clear feedback can benefit students.", "同义词复现。"],
  ["require", "需要；要求", "verb", "require effort", "Language learning requires regular effort.", "正式动词。"],
  ["involve", "涉及；包含", "verb", "involve practice", "Good learning involves practice and feedback.", "写作高频。"],
  ["encourage", "鼓励", "verb", "encourage students", "Teachers should encourage students to speak.", "教育话题。"],
  ["discourage", "使泄气；阻止", "verb", "discourage creativity", "Too many tests may discourage creativity.", "教育话题。"],
  ["promote", "促进", "verb", "promote learning", "Reading promotes language development.", "正式动词。"],
  ["enhance", "提升", "verb", "enhance skills", "Practice can enhance communication skills.", "高分替换 improve。"],
  ["strengthen", "加强", "verb", "strengthen memory", "Revision strengthens long-term memory.", "学习话题。"],
  ["broaden", "拓宽", "verb", "broaden knowledge", "Reading can broaden students' knowledge.", "阅读话题。"],
  ["deepen", "加深", "verb", "deepen understanding", "Examples can deepen understanding.", "学习话题。"],
  ["develop", "发展；培养", "verb", "develop skills", "Students can develop skills through practice.", "教育高频。"],
  ["cultivate", "培养", "verb", "cultivate habits", "Schools can cultivate good study habits.", "正式词。"],
  ["maintain", "保持", "verb", "maintain focus", "Students need to maintain focus during study.", "学习习惯。"],
  ["manage", "管理", "verb", "manage time", "Students should manage time carefully.", "学习计划。"],
  ["achieve", "实现；达到", "verb", "achieve goals", "Daily practice helps students achieve goals.", "目标话题。"],
  ["accomplish", "完成", "verb", "accomplish a task", "Small tasks are easier to accomplish.", "任务话题。"],
  ["complete", "完成；完整的", "verb/adjective", "complete homework", "Students should complete homework on time.", "同义词复现。"],
  ["evaluate", "评价", "verb", "evaluate progress", "Students should evaluate progress regularly.", "学习管理。"],
  ["measure", "衡量", "verb/noun", "measure progress", "Scores can measure progress, but not everything.", "看板话题。"],
  ["monitor", "监督；监测", "verb", "monitor learning", "Parents can monitor learning progress.", "家长看板。"],
  ["supervise", "监督", "verb", "supervise children", "Parents should supervise young learners online.", "家长监督。"],
  ["guideline", "指导原则", "noun", "clear guidelines", "Clear guidelines help children use apps safely.", "家长教育。"],
  ["boundary", "界限", "noun", "set boundaries", "Parents can set boundaries for screen time.", "家庭教育。"],
  ["permission", "允许", "noun", "ask for permission", "Children should ask for permission before downloading apps.", "安全话题。"],
  ["privacy", "隐私", "noun", "protect privacy", "Students should protect privacy online.", "网络安全。"],
  ["security", "安全", "noun", "online security", "Online security is important for children.", "科技安全。"],
  ["reliable", "可靠的", "adjective", "reliable information", "Students should use reliable information.", "网络学习。"],
  ["accurate", "准确的", "adjective", "accurate data", "Accurate data makes a report stronger.", "同义词复现。"],
  ["misleading", "误导性的", "adjective", "misleading information", "Some online information can be misleading.", "网络话题。"],
  ["source", "来源", "noun", "a reliable source", "Students should check the source of information.", "研究写作。"],
  ["data", "数据", "noun", "collect data", "The data shows a clear increase.", "Task 1 核心。"],
  ["figure", "数字；图形", "noun", "the figure for 2024", "The figure for 2024 was much higher.", "Task 1。"],
  ["percentage", "百分比", "noun", "a small percentage", "A large percentage of students used apps.", "Task 1。"],
  ["rate", "比率；速度", "noun", "the rate of growth", "The rate of growth was faster after 2020.", "Task 1。"],
  ["amount", "数量", "noun", "the amount of time", "The amount of study time increased.", "不可数数量。"],
  ["number", "数量", "noun", "the number of students", "The number of students rose sharply.", "可数数量。"],
  ["majority", "大多数", "noun", "the majority of", "The majority of students preferred apps.", "Task 1/2。"],
  ["minority", "少数", "noun", "a minority of", "A minority of students used textbooks only.", "Task 1。"],
  ["average", "平均的；平均数", "noun/adjective", "on average", "Students studied for two hours on average.", "数据表达。"],
  ["range", "范围", "noun", "a wide range of", "A wide range of resources is available online.", "高频搭配。"],
  ["total", "总数；总的", "noun/adjective", "the total number", "The total number increased gradually.", "Task 1。"],
  ["overall", "总体的；总体上", "adjective/adverb", "overall trend", "Overall, app use increased.", "Task 1 overview。"],
  ["initial", "最初的", "adjective", "the initial figure", "The initial figure was only 20%.", "Task 1。"],
  ["final", "最终的", "adjective", "the final figure", "The final figure reached 80%.", "Task 1。"],
  ["period", "时期", "noun", "over the period", "The number increased over the period.", "Task 1。"],
  ["decade", "十年", "noun", "over a decade", "The trend changed over a decade.", "时间表达。"],
  ["annual", "年度的", "adjective", "annual growth", "Annual growth was steady.", "Task 1。"],
  ["monthly", "每月的", "adjective/adverb", "monthly practice", "Monthly practice tests can track progress.", "学习计划。"],
  ["daily", "每日的", "adjective/adverb", "daily review", "Daily review builds strong memory.", "学习习惯。"],
  ["weekly", "每周的", "adjective/adverb", "weekly goals", "Weekly goals make learning manageable.", "学习计划。"],
  ["steady", "稳定的", "adjective", "a steady increase", "There was a steady increase in app use.", "Task 1。"],
  ["dramatic", "巨大的；戏剧性的", "adjective", "a dramatic rise", "There was a dramatic rise after 2020.", "Task 1。"],
  ["slight", "轻微的", "adjective", "a slight fall", "There was a slight fall in textbook use.", "Task 1。"],
  ["rapid", "快速的", "adjective", "rapid growth", "Online learning saw rapid growth.", "Task 1。"],
  ["slow", "缓慢的", "adjective", "slow growth", "The growth was slow at first.", "Task 1。"],
  ["fluctuate", "波动", "verb", "fluctuate slightly", "The figure fluctuated slightly during the period.", "Task 1。"],
  ["decline", "下降", "noun/verb", "a gradual decline", "Textbook use declined gradually.", "Task 1。"],
  ["drop", "下降", "noun/verb", "a sharp drop", "There was a sharp drop in 2022.", "Task 1。"],
  ["rise", "上升", "noun/verb", "a steady rise", "There was a steady rise in app use.", "Task 1。"],
  ["fall", "下降", "noun/verb", "a slight fall", "The figure fell slightly.", "Task 1。"],
  ["grow", "增长", "verb", "grow rapidly", "The number grew rapidly after 2020.", "Task 1。"],
  ["growth", "增长", "noun", "rapid growth", "The chart shows rapid growth.", "Task 1。"],
  ["reach", "达到", "verb", "reach a peak", "The figure reached a peak in 2024.", "Task 1。"],
  ["account for", "占比", "phrase", "account for 40%", "Apps accounted for 40% of study time.", "Task 1 高分搭配。"],
  ["represent", "代表；占", "verb", "represent a proportion", "The figure represents the proportion of students.", "Task 1。"],
  ["indicate", "表明", "verb", "indicate a trend", "The data indicates a clear trend.", "正式表达。"],
  ["illustrate", "说明；展示", "verb", "illustrate changes", "The chart illustrates changes in study habits.", "Task 1 开头。"],
  ["compare", "比较", "verb", "compare two groups", "The chart compares two study methods.", "Task 1 开头。"],
  ["summarise", "总结", "verb", "summarise the main trend", "The overview should summarise the main trend.", "英式拼写。"],
  ["overview", "概述", "noun", "write an overview", "Task 1 needs a clear overview.", "Task 1 核心。"],
  ["trend", "趋势", "noun", "a clear trend", "The chart shows a clear trend.", "同义词复现。"],
  ["category", "类别", "noun", "two categories", "The chart has two categories.", "Task 1。"],
  ["method", "方法", "noun", "study method", "The two methods showed different trends.", "同义词复现。"],
  ["textbook", "课本", "noun", "use textbooks", "Textbooks remained useful for many students.", "学习方式。"],
  ["application", "应用程序", "noun", "learning application", "A learning application can support daily review.", "app 的正式说法。"],
  ["online", "在线的", "adjective/adverb", "online learning", "Online learning became popular during the pandemic.", "科技教育。"],
  ["offline", "离线的；线下的", "adjective/adverb", "offline practice", "Offline practice can reduce distractions.", "学习方式。"],
  ["classroom", "教室；课堂", "noun", "classroom learning", "Classroom learning provides direct interaction.", "教育话题。"],
  ["lecture", "讲座；课", "noun", "attend a lecture", "Students can attend lectures online.", "学校话题。"],
  ["tutorial", "辅导课", "noun", "online tutorial", "Online tutorials can explain grammar clearly.", "学习资源。"],
  ["workshop", "工作坊", "noun", "writing workshop", "A writing workshop gives students practice.", "学习活动。"],
  ["curriculum", "课程体系", "noun", "school curriculum", "Grammar should be part of the curriculum.", "教育正式词。"],
  ["syllabus", "教学大纲", "noun", "exam syllabus", "The syllabus includes grammar and vocabulary.", "考试课程。"],
  ["foundation", "基础", "noun", "a strong foundation", "Grammar is a foundation for writing.", "学习基础。"],
  ["basic", "基础的", "adjective", "basic grammar", "Basic grammar must be accurate.", "基础学习。"],
  ["advanced", "高级的", "adjective", "advanced vocabulary", "Advanced vocabulary should be used accurately.", "进阶学习。"],
  ["complex", "复杂的", "adjective", "complex sentences", "Complex sentences need clear structure.", "语法话题。"],
  ["simple", "简单的", "adjective", "simple sentences", "Simple sentences can be powerful when accurate.", "语法话题。"],
  ["compound", "复合的；并列的", "adjective", "compound sentence", "A compound sentence joins two main clauses.", "语法话题。"],
  ["relative clause", "定语从句", "noun", "use a relative clause", "A relative clause adds information about a noun.", "Day 11 核心。"],
  ["object clause", "宾语从句", "noun", "use an object clause", "An object clause can express opinions.", "Day 10 核心。"],
  ["passive voice", "被动语态", "noun", "use passive voice", "Passive voice focuses on the receiver of an action.", "Day 12 核心。"],
  ["linking verb", "系动词", "noun", "use a linking verb", "A linking verb connects the subject and complement.", "Day 2 核心。"],
  ["complement", "表语；补足语", "noun", "subject complement", "A complement describes the subject.", "主系表核心。"],
  ["agreement", "一致", "noun", "subject-verb agreement", "Subject-verb agreement improves accuracy.", "语法评分。"],
  ["tense", "时态", "noun", "use the correct tense", "Correct tense is important in Task 1.", "语法核心。"],
  ["punctuate", "加标点", "verb", "punctuate correctly", "Students should punctuate long sentences correctly.", "写作准确性。"],
  ["comma", "逗号", "noun", "use a comma", "Use a comma after a fronted clause.", "标点。"],
  ["full stop", "句号", "noun", "use a full stop", "A full stop separates complete ideas.", "英式说法。"],
  ["fragment", "残句", "noun", "avoid fragments", "A fragment is not a complete sentence.", "句子边界。"],
  ["run-on sentence", "粘连句", "noun", "avoid run-on sentences", "A run-on sentence joins ideas incorrectly.", "写作准确性。"],
  ["clause", "从句；分句", "noun", "main clause", "A main clause can stand alone.", "同义词复现。"],
  ["main clause", "主句", "noun", "write a main clause", "A main clause must be complete.", "从句学习。"],
  ["subordinate clause", "从属从句", "noun", "use a subordinate clause", "A subordinate clause needs a main clause.", "复合句。"],
  ["connector", "连接词", "noun", "choose a connector", "A connector shows the relationship between ideas.", "Day 14 核心。"],
  ["transition", "过渡", "noun", "smooth transitions", "Transitions make an essay coherent.", "写作连贯。"],
  ["coherence", "连贯性", "noun", "improve coherence", "Clear paragraphs improve coherence.", "IELTS 写作评分。"],
  ["cohesion", "衔接", "noun", "cohesion between sentences", "Pronouns and connectors improve cohesion.", "IELTS 写作评分。"],
  ["lexical", "词汇的", "adjective", "lexical resource", "IELTS writing includes lexical resource.", "评分标准。"],
  ["resource", "资源", "noun", "lexical resource", "Lexical resource means vocabulary range and accuracy.", "同词不同搭配。"],
  ["grammar range", "语法范围", "noun", "grammar range and accuracy", "IELTS rewards grammar range and accuracy.", "评分标准。"],
  ["task response", "任务回应", "noun", "improve task response", "Task response means answering the question fully.", "写作评分。"],
  ["fluency", "流利度", "noun", "speaking fluency", "Fluency improves with regular practice.", "口语评分。"],
  ["accuracy", "准确性", "noun", "fluency and accuracy", "Speaking needs both fluency and accuracy.", "同义词复现。"],
  ["range", "范围", "noun", "a range of structures", "Use a range of structures accurately.", "语法评分。"],
  ["natural", "自然的", "adjective", "natural speech", "Natural speech includes pauses and examples.", "口语目标。"],
  ["confident", "自信的", "adjective", "feel confident", "Practice helps students feel confident.", "口语目标。"],
  ["clear", "清楚的", "adjective", "clear pronunciation", "Clear pronunciation helps communication.", "同义词复现。"],
  ["brief", "简短的", "adjective", "a brief answer", "A brief answer may need more detail.", "口语 Part 1。"],
  ["elaborate", "详细说明", "verb", "elaborate on an idea", "Students should elaborate on answers in Part 3.", "口语进阶。"],
  ["justify", "证明；说明理由", "verb", "justify an opinion", "Part 3 answers should justify opinions.", "口语高分。"],
  ["clarify", "澄清", "verb", "clarify an idea", "Examples can clarify an idea.", "表达清楚。"],
  ["summarize", "总结", "verb", "summarize a point", "A conclusion summarizes the main point.", "美式拼写备用。"],
  ["repeat", "重复", "verb", "avoid repeating", "Avoid repeating the same word too often.", "词汇多样性。"],
  ["replace", "替换", "verb", "replace simple words", "Students can replace simple words with precise ones.", "词汇提升。"],
  ["precise", "精确的", "adjective", "precise vocabulary", "Precise vocabulary improves writing quality.", "词汇目标。"],
  ["vague", "模糊的", "adjective", "vague language", "Vague language makes an answer weaker.", "表达提醒。"],
  ["specific", "具体的", "adjective", "specific details", "Specific details make examples convincing.", "同义词复现。"],
  ["general", "一般的", "adjective", "a general statement", "A general statement needs support.", "写作结构。"],
  ["topic sentence", "主题句", "noun", "write a topic sentence", "A topic sentence introduces the main idea.", "段落核心。"],
  ["supporting sentence", "支持句", "noun", "write supporting sentences", "Supporting sentences explain the topic sentence.", "段落核心。"],
  ["mini conclusion", "小结句", "noun", "end with a mini conclusion", "A mini conclusion links back to the main point.", "主体段。"],
  ["introduction", "开头段", "noun", "write an introduction", "An introduction presents the topic and opinion.", "大作文结构。"],
  ["body paragraph", "主体段", "noun", "write a body paragraph", "A body paragraph develops one main idea.", "大作文结构。"],
  ["concluding sentence", "结尾句", "noun", "write a concluding sentence", "A concluding sentence closes the paragraph.", "段落结构。"],
  ["paraphrase", "改写", "verb/noun", "paraphrase the question", "Introductions often paraphrase the question.", "写作技巧。"],
  ["outline", "提纲", "noun/verb", "make an outline", "An outline helps organize ideas.", "写作准备。"],
  ["draft", "草稿", "noun/verb", "write a draft", "A first draft does not need to be perfect.", "写作过程。"],
  ["edit", "编辑；修改", "verb", "edit a paragraph", "Students should edit grammar after writing.", "写作过程。"],
  ["proofread", "校对", "verb", "proofread an essay", "Proofreading can catch spelling mistakes.", "写作过程。"],
  ["checklist", "检查清单", "noun", "use a checklist", "A checklist helps students review their work.", "学习工具。"],
  ["target", "目标", "noun", "set a target", "A daily target makes learning clear.", "学习计划。"],
  ["achievement", "成就", "noun", "a sense of achievement", "Small wins create a sense of achievement.", "学习动力。"],
  ["consistency", "坚持；一致性", "noun", "learning consistency", "Consistency matters more than sudden effort.", "学习习惯。"],
  ["patience", "耐心", "noun", "have patience", "Language learning requires patience.", "学习态度。"],
  ["effort", "努力", "noun", "make an effort", "Students need to make an effort every day.", "学习态度。"],
  ["curious", "好奇的", "adjective", "be curious about", "Curious students ask better questions.", "学习态度。"],
  ["responsible", "负责任的", "adjective", "be responsible for", "Students should be responsible for their learning.", "品格教育。"],
  ["mature", "成熟的", "adjective", "a mature attitude", "A mature attitude helps teenagers learn independently.", "青少年话题。"],
  ["independence", "独立性", "noun", "develop independence", "Independent study develops independence.", "教育目标。"],
  ["initiative", "主动性", "noun", "take initiative", "Students who take initiative improve faster.", "学习品质。"],
];

const excludedStudentWords = new Set([
  "subject",
  "verb",
  "object",
  "punctuation",
  "sentence",
  "clause",
  "relative clause",
  "object clause",
  "passive voice",
  "linking verb",
  "complement",
  "agreement",
  "tense",
  "punctuate",
  "comma",
  "full stop",
  "fragment",
  "run-on sentence",
  "main clause",
  "subordinate clause",
  "connector",
  "grammar range",
  "task response",
]);

const lessonPlans = {
  单复数和数字单位: [
    ["今天目标：名词数量写准确", "IELTS 写作里，名词数量会影响 grammar accuracy。可数名词要判断单数/复数，不可数名词不能随便加 s。"],
    ["可数名词", "一个可数名词单独出现时，通常需要 a/an/the 或复数形式：a teacher / many teachers / the number of students。"],
    ["不可数名词", "knowledge, evidence, advice, information 这类词一般不可数。可以说 a piece of advice / useful information，不说 informations。"],
    ["数字单位", "具体数字 + hundred/thousand/million/billion 时，单位不加 s：70 billion calls。泛指时才说 billions of people。"],
    ["Task 1 写法", "The number of students increased to 70 million. / There were 20 students in 2020. / The figure rose by 15 percent."],
    ["今天完成标准", "能区分可数/不可数；能写对 many teachers, 70 billion calls, much information；能用数字写 5 个 Task 1 句子。"],
  ],
  一般现在和现在进行: [
    ["今天目标：区分习惯和正在发生", "一般现在讲事实、习惯、观点；现在进行讲此刻或最近正在发生的动作。"],
    ["一般现在", "用来写观点和规律：Students review vocabulary every day. Reading improves writing. Technology changes education."],
    ["现在进行", "用 am/is/are + doing 描述正在发生：The student is practising speaking now. More learners are using apps this summer."],
    ["第三人称单数", "he/she/it 或单数名词后，一般现在动词加 s：A good method helps students. This app improves vocabulary."],
    ["雅思应用", "Task 2 多用一般现在表达观点；口语 Part 1 可以用一般现在讲习惯，用现在进行讲最近在做什么。"],
    ["今天完成标准", "能选择 do/does 和 am/is/are doing；能写 5 个习惯句和 3 个正在发生的句子。"],
  ],
  一般过去和过去进行: [
    ["今天目标：讲清过去", "一般过去讲过去发生了什么；过去进行讲过去某个时间正在发生什么。Task 1 过去年份通常用一般过去。"],
    ["一般过去", "规则动词加 -ed，不规则动词要记：increase increased, go went, write wrote。"],
    ["过去进行", "was/were + doing：At 8 pm, I was reviewing vocabulary. In 2020, many students were studying online."],
    ["Task 1 过去图表", "The number increased from 20 to 80. The figure reached a peak in 2024. It remained stable after 2022."],
    ["不要混时态", "如果图表年份都在过去，整段尽量统一用过去时，不要突然写 will increase 或 is increasing。"],
    ["今天完成标准", "能区分 did 和 was/were doing；能用过去时写 6 个图表句；能避免过去图表预测未来。"],
  ],
  完成时和将来时: [
    ["今天目标：过去到现在 + 未来计划", "完成时强调过去和现在的联系；将来时表达预测、计划或可能结果。"],
    ["现在完成", "have/has + done：I have learned many new words. The number has increased since 2020."],
    ["现在完成进行", "have/has been doing 强调持续：I have been studying English for six years."],
    ["将来时", "will / be going to 表示未来：Schools will use more technology. I am going to review words every day."],
    ["Task 1 小心", "如果图表没有未来数据，不要自己预测。只描述图中已有信息。"],
    ["今天完成标准", "能写 have learned / has increased / have been studying；能区分未来计划和图表事实。"],
  ],
  简单句与复合句: [
    ["今天目标：从准确短句到清楚长句", "简单句先保证准确；复合句用 because, when, who, which 等连接逻辑。"],
    ["简单句", "A complete sentence has a subject and a verb. Short accurate sentences are useful in IELTS writing."],
    ["复合句", "复合句 = 主句 + 从句。主句必须完整：Students improve because they review mistakes."],
    ["先拆再合", "Advertising is useful. It teaches children new ideas. -> Advertising is useful because it teaches children new ideas."],
    ["避免残句", "Because reading is useful 不是完整句。Because reading is useful, students should read regularly 才完整。"],
    ["今天完成标准", "能判断简单句和复合句；能把两个短句合成 because/when/which 句；能避免残句。"],
  ],
  原因和时间从句: [
    ["今天目标：表达 why 和 when", "原因从句回答为什么，时间从句回答什么时候。它们能让口语和写作更有逻辑。"],
    ["原因从句", "because/since/as 引导原因：Students improve because they review mistakes."],
    ["时间从句", "when/after/before/while 引导时间：When students review words, they remember them better."],
    ["位置变化", "从句可放前也可放后。放前面时常用逗号：After students practise, they become more confident."],
    ["雅思应用", "Task 2 用原因从句解释观点；Speaking Part 3 用时间从句描述变化。"],
    ["今天完成标准", "能写 4 个 because 句和 4 个 when/after 句；每句主句都完整。"],
  ],
  宾语从句: [
    ["今天目标：表达观点和信息", "宾语从句常放在 think, believe, know, show, suggest 后面，用来表达观点或图表信息。"],
    ["观点句", "I think that reading is important. Many people believe that education should be practical."],
    ["图表句", "The chart shows that app usage increased. The data suggests that students prefer flexible learning."],
    ["语序", "宾语从句保持陈述句语序：I know why students like apps，不说 I know why do students like apps。"],
    ["that 可省略", "口语中 that 常省略：I think reading is useful. 写作中保留 that 会更清楚。"],
    ["今天完成标准", "能用 think/believe/show/suggest 写 8 个宾语从句；能避免疑问句语序。"],
  ],
  定语从句: [
    ["今天目标：给名词加说明", "定语从句修饰前面的名词，让句子更具体。who 修饰人，which 修饰物，that 可修饰人或物。"],
    ["who", "A teacher who gives clear feedback can help students improve."],
    ["which", "Books which contain useful examples are helpful for learners."],
    ["that", "The method that works best is regular review."],
    ["雅思应用", "Task 2 用定语从句增加细节；口语 Part 2 用它描述人物、书、地点和经历。"],
    ["今天完成标准", "能写 3 个 who 句、3 个 which 句、2 个 that 句；关系词指代要清楚。"],
  ],
  被动语态: [
    ["今天目标：强调动作承受者", "被动语态是 be + done，用来强调被影响的人或物，而不是动作执行者。"],
    ["基本结构", "Books are written by authors. Children should be guided by parents."],
    ["不同时态", "The data was collected in 2020. The lesson is designed for IELTS practice."],
    ["Task 1/2 应用", "Task 1 可写 The data was collected from 2020 to 2024. Task 2 可写 Students should be encouraged to read."],
    ["by 的使用", "需要说明执行者时用 by；不重要时可以省略：Many books are published every year."],
    ["今天完成标准", "能写 are written / was collected / should be guided；能判断什么时候用主动，什么时候用被动。"],
  ],
  比较和趋势表达: [
    ["今天目标：比较数据和趋势", "Task 1 需要描述上升、下降、稳定、峰值和两组数据之间的差异。"],
    ["趋势动词", "increase, decrease, rise, fall, remain stable, reach a peak 都是 Task 1 高频表达。"],
    ["比较句", "A is higher than B. Online learning increased more quickly than classroom learning."],
    ["对比连接", "while / whereas / in contrast 可比较两组数据：Online use rose, while textbook use remained stable."],
    ["数据表达", "approximately, proportion, respectively 可让数据句更准确。"],
    ["今天完成标准", "能写 5 个趋势句和 5 个比较句；能使用 while/in contrast/respectively。"],
  ],
  连接词和四段结构: [
    ["今天目标：把文章搭起来", "Task 2 通常用四段：开头、主体段 1、主体段 2、结尾。连接词要表达真实逻辑。"],
    ["开头段", "改写题目 + 给出立场。不要背很空的模板，要让观点清楚。"],
    ["主体段", "每段一个中心观点：Topic sentence + reason + example + mini conclusion。"],
    ["连接词", "however 表转折，therefore 表结果，for example 举例，in addition 补充。不要每句都用 moreover。"],
    ["结尾段", "总结主要观点，不引入新理由。可以重申自己的 opinion。"],
    ["今天完成标准", "能搭出 4 段提纲；能为每段写一个 topic sentence；能正确选择连接词。"],
  ],
};

const skillLessonPlans = {
  "Task 1 overview": [
    ["今天目标：写出总览句", "Task 1 的 overview 不写具体数字，而是总结最明显的趋势、最高最低点、最大变化或主要对比。"],
    ["先看大变化", "看图时先问：整体上升还是下降？哪一项最高？哪一项变化最大？有没有稳定或波动？"],
    ["总览句公式", "Overall, X increased significantly, while Y remained relatively stable. / Overall, the most noticeable change was a sharp rise in X."],
    ["不要写细节", "Overview 里不要堆数字。数字留给 body paragraph。总览只负责告诉考官“我看懂了图”。"],
    ["常用词", "overall, noticeable, significant, slight, stable, peak, decline, in contrast。"],
    ["今天完成标准", "能为一张线图写 2 个 overview 版本：一个讲整体趋势，一个讲最大对比。"],
  ],
  "Task 1 details": [
    ["今天目标：把数字写准确", "Task 1 细节段要选择关键数据，不是把每个数字都抄一遍。"],
    ["选数字原则", "选起点、终点、最高点、最低点、变化最大的点，以及能支持 overview 的数据。"],
    ["比较写法", "The figure for X rose from 20% to 65%, whereas Y fell from 60% to 45%."],
    ["精确和约数", "能确定就写具体数字；不确定可用 approximately/about/around。不要自己编图里没有的原因。"],
    ["句子顺序", "先写第一组变化，再写第二组变化，最后用一句比较或小结。"],
    ["今天完成标准", "能写 6-8 句数据细节，至少包含 from...to, whereas/while, respectively。"],
  ],
  "Task 2 opinion": [
    ["今天目标：观点段写清楚", "观点类作文的主体段需要一个明确立场，再用原因和例子支撑。"],
    ["段落骨架", "Topic sentence + reason + example + mini conclusion。每段只发展一个主观点。"],
    ["观点句", "One important reason is that daily practice builds long-term memory."],
    ["例子句", "For example, a student who reviews vocabulary every evening is more likely to use words accurately in writing."],
    ["小结句", "Therefore, regular practice is more useful than short periods of intense study."],
    ["今天完成标准", "能写一个 90-120 词主体段，观点、原因、例子、小结都完整。"],
  ],
  "Task 2 discussion": [
    ["今天目标：讨论两边观点", "讨论类题目要解释两种观点，再给自己的判断。不能只写一边。"],
    ["两边结构", "Body 1: why some people think A. Body 2: why others prefer B + your view."],
    ["平衡表达", "Some people argue that... / Others believe that... / I tend to agree with the second view because..."],
    ["避免空泛", "每边都要有具体原因和例子。不要只写 It is good / It is bad。"],
    ["连接词", "on the one hand, on the other hand, however, in my view, therefore。"],
    ["今天完成标准", "能写两个小主体段：一段讲线上学习，一段讲课堂学习，并给出个人观点。"],
  ],
  Coherence: [
    ["今天目标：段落读起来顺", "Coherence 是逻辑连贯，Cohesion 是句子衔接。雅思写作需要读者不用猜也能跟上你的思路。"],
    ["一个段落一个中心", "每段只讲一个主要观点。不要一句讲科技，一句跳到健康，再跳到朋友。"],
    ["旧信息到新信息", "先接住上一句，再推进下一句：This habit... It... As a result..."],
    ["连接词不要乱用", "However 必须有转折，therefore 必须有结果，for example 必须真的是例子。"],
    ["检查方法", "读每段第一句，看是否能看出文章结构；删除重复句和跑题句。"],
    ["今天完成标准", "能把一段打乱的句子排成正确顺序，并改写 4 个连接词。"],
  ],
  "Lexical resource": [
    ["今天目标：词汇准确而不堆砌", "Lexical resource 看词汇范围、准确性、搭配和拼写。高级词用错不如普通词用准。"],
    ["替换不是硬换", "important 可根据语境换成 essential, significant, valuable；但不要为了高级写奇怪表达。"],
    ["搭配优先", "make progress, gain knowledge, develop a habit, improve accuracy, provide guidance。搭配自然比单词难度更重要。"],
    ["避免重复", "同一段里不要一直重复 good/useful/important。可以用 beneficial, effective, practical, valuable。"],
    ["拼写也算词汇", "拼错的词会影响理解和词汇分，所以单词模块必须做拼写。"],
    ["今天完成标准", "把一个普通段落升级 8 个词，同时保持意思准确自然。"],
  ],
  "Writing review": [
    ["今天目标：像考后复盘一样修改", "写作提升不只靠写新作文，还要学会发现自己的语法、逻辑、词汇和任务回应问题。"],
    ["四步检查", "1 任务有没有回答；2 段落是否清楚；3 句子是否完整；4 词汇和拼写是否准确。"],
    ["先大后小", "先改跑题和段落，再改句子，最后改拼写。不要一开始只盯一个单词。"],
    ["建立错句库", "把修改前和修改后的句子保存下来，之后 Warm-up 抽查。"],
    ["家长看板怎么用", "写完保存后，家长可以复制到 AI 或老师那里评分，网页负责保留每天的原稿和修改记录。"],
    ["今天完成标准", "完成一次旧作文修改，并写下 3 条下次写作前要注意的规则。"],
  ],
  "Listening forms": [
    ["今天目标：Section 1 填表", "剑桥雅思听力 Section 1 常见姓名、电话、日期、地址、价格、课程、预约信息。"],
    ["先预测词性", "听前看空格：需要 number, name, noun, date 还是 adjective？预测能减少乱听。"],
    ["拼写重点", "姓名和地址会逐字母拼写；数字可能连读；日期要注意 13/30, 15/50 这类混淆。"],
    ["题目限制", "ONE WORD AND/OR A NUMBER 必须遵守。多写一个词也算错。"],
    ["检查方式", "听完检查大小写不重要，但拼写、单复数和数字格式很重要。"],
    ["今天完成标准", "能做 10 个填表预测，并正确记录 5 个拼写型信息。"],
  ],
  "Listening maps": [
    ["今天目标：Section 2 地图和地点", "地图题重点不是翻译每个词，而是跟住路线和方位。"],
    ["方位词", "left, right, opposite, next to, behind, between, at the entrance, in the corner。"],
    ["听路线", "先找到起点，再按顺序画箭头。听到 now, then, after that 要跟着移动。"],
    ["干扰信息", "说话人可能先提一个地点又否定它：not the old cafe, but the new one near the lake。"],
    ["设施词", "reception, car park, library, cafe, theatre, entrance, garden, playground。"],
    ["今天完成标准", "能根据 8 句方位描述标出地点，并解释为什么不是其他选项。"],
  ],
  "Listening discussion": [
    ["今天目标：Section 3 学术讨论", "Section 3 常是学生和老师讨论项目、课程、调查或作业，重点听观点变化。"],
    ["听态度", "agree, disagree, suggest, worry, prefer, recommend 这些词会决定答案。"],
    ["同义替换", "题目写 useful，录音可能说 practical/helpful/effective。不要只等原词。"],
    ["多人说话", "注意是谁的观点。男生、女生、老师可能给不同答案。"],
    ["常见任务", "选择题、匹配题、表格题。先圈关键词，再听观点和原因。"],
    ["今天完成标准", "能判断 10 个句子是 agreement, disagreement 还是 suggestion。"],
  ],
  "Listening lecture": [
    ["今天目标：Section 4 讲座笔记", "Section 4 是单人学术讲座，没有停顿对话，靠结构词跟住内容。"],
    ["听结构词", "first, next, another point, for example, however, as a result, finally。"],
    ["预测空格", "看空格前后判断词性：an ___ method 需要形容词或名词；increase in ___ 需要名词。"],
    ["学术主题", "环境、动物、历史、科技、教育、健康都常见。词汇越熟，听定位越快。"],
    ["拼写检查", "Section 4 的答案常是学术词，写完要检查单复数和词形。"],
    ["今天完成标准", "能按讲座提纲预测 10 个空格词性，并完成一组笔记填空。"],
  ],
  "Reading skimming": [
    ["今天目标：先看懂段落主旨", "阅读不能从第一个词慢慢翻译到最后。Skimming 是快速抓主旨和结构。"],
    ["看哪里", "看标题、首句、转折词、重复词、结尾句。先知道每段大概讲什么。"],
    ["主旨不是细节", "段落里有日期、名字、例子，不代表它们就是主旨。主旨通常更概括。"],
    ["做题顺序", "先扫文章结构，再看题目关键词，再回原文定位。"],
    ["记录方式", "每段旁边写 3-5 个词中文标签：原因、问题、解决、例子、结果。"],
    ["今天完成标准", "能为 5 个段落各写一个 5 词以内的英文或中文主旨标签。"],
  ],
  "Reading matching": [
    ["今天目标：匹配题定位", "Matching headings/information 考主旨、细节和同义替换。不要只找题目原词。"],
    ["关键词升级", "题目词可能被改写：children -> young people, harmful -> negative, method -> approach。"],
    ["先易后难", "先做明显段落，剩下的用排除法。不要卡在一个题上太久。"],
    ["信息匹配", "找具体信息时注意数字、人名、地点、研究结论和例子。"],
    ["标题匹配", "标题要覆盖整段，不是只覆盖一句细节。"],
    ["今天完成标准", "能把 8 个题目关键词写出同义替换，并完成一组匹配练习。"],
  ],
  "Reading T/F/NG": [
    ["今天目标：区分 False 和 Not Given", "True/False/Not Given 最难的是不要用常识答题，只能看原文有没有证据。"],
    ["True", "题目意思和原文一致，即使单词不同也可以 True。"],
    ["False", "原文明确说相反信息。比如题目说 all，原文说 some。"],
    ["Not Given", "原文没有提到或无法判断。不是你觉得可能对，而是文章没证据。"],
    ["高危词", "all, always, never, only, first, most, increase, decrease, before, after。"],
    ["今天完成标准", "能为每道判断题写一句证据或说明“原文没给”。"],
  ],
  "Speaking Part 1": [
    ["今天目标：短问题答完整", "Part 1 不需要背长段落，但不能只说 Yes/No。用 answer + reason + example。"],
    ["三句结构", "Yes, I do. I like it because it helps me relax. For example, I often read after school."],
    ["语言自然", "用简单准确的句子比硬塞复杂词更好。重点是回答直接、发音清楚、不卡太久。"],
    ["常见主题", "school, reading, hobbies, technology, family, weekends, food, transport。"],
    ["扩展方法", "原因、例子、频率、过去对比、感受。每题选一种扩展即可。"],
    ["今天完成标准", "回答 8 个 Part 1 问题，每题至少 3 句，并保存 3 个最好的答案。"],
  ],
  "Speaking Part 2": [
    ["今天目标：一分钟描述", "Part 2 要根据 cue card 说一个人、地点、物品或经历。先用笔记，不写全文背诵。"],
    ["笔记结构", "What/Who + When/Where + Details + Why。每个点写关键词，不写完整稿。"],
    ["讲故事顺序", "先介绍背景，再说两个具体细节，最后说感受或影响。"],
    ["拖长方法", "加时间、地点、人物、原因、例子、对比和感受。"],
    ["常用句", "I first came across it when... / What impressed me most was... / It helped me because..."],
    ["今天完成标准", "用 1 分钟说完一个话题，并记录 5 个关键词和 3 个完整句。"],
  ],
};

function renderLessonPlan(point) {
  const slides = lessonPlans[point] || skillLessonPlans[point];
  if (!slides) return "";
  return `
    <div class="lesson-deck">
      ${slides
        .map(
          ([title, body], index) => `
            <section class="lesson-slide ${index >= 3 ? "wide-slide" : ""}">
              <span>${index + 1}</span>
              <div>
                <strong>${title}</strong>
                <p>${body}</p>
              </div>
            </section>`,
        )
        .join("")}
    </div>
  `;
}

function renderGrammarLesson(point, week) {
  if (point === "主谓宾") {
    return `
      <div class="lesson-deck">
        <section class="lesson-slide">
          <span>1</span>
          <div>
            <strong>今天只抓一个目标：完整句</strong>
            <p>一个 IELTS 句子先必须站稳：Subject + Verb + Object。没有主语、没有动词、或者只有 because/when 开头的一半句子，都不是完整句。</p>
          </div>
        </section>
        <section class="lesson-slide">
          <span>2</span>
          <div>
            <strong>三步检查法</strong>
            <ul>
              <li>第一步：圈出主语。谁在做？students / reading / parents / advertisements。</li>
              <li>第二步：划出动词。做了什么？improve / helps / guide / influence。</li>
              <li>第三步：看后面有没有宾语或补充信息。improve writing / help children / guide students。</li>
            </ul>
          </div>
        </section>
        <section class="lesson-slide">
          <span>3</span>
          <div>
            <strong>常见问题</strong>
            <p>把一个想法写成半句话，例如 “Because reading is useful.” 这只有原因从句，没有主句。也会把两个完整句硬黏在一起，例如 “Advertising is good it helps children learn.”</p>
          </div>
        </section>
        <section class="lesson-slide wide-slide">
          <span>4</span>
          <div>
            <strong>雅思句子模板</strong>
            <ul>
              <li>Reading books improves students' vocabulary.</li>
              <li>Daily review helps learners remember new words.</li>
              <li>Parents can guide children when they use learning apps.</li>
              <li>Accurate grammar makes an essay easier to understand.</li>
            </ul>
          </div>
        </section>
        <section class="lesson-slide wide-slide">
          <span>5</span>
          <div>
            <strong>从短句到雅思小段落</strong>
            <p>先写 3 个短句：观点句、原因句、例子句。确认每句都有主语和动词后，再用 because / for example / therefore 连接。准确的小段落比一串错误长句更像 IELTS 写作。</p>
          </div>
        </section>
        <section class="lesson-slide wide-slide">
          <span>6</span>
          <div>
            <strong>今天完成标准</strong>
            <p>能判断完整句和残句；能把粘在一起的两个句子拆开；能写 6-8 个主谓宾清楚的 IELTS 学习话题句子。</p>
          </div>
        </section>
      </div>
    `;
  }

  if (point === "主系表") {
    return `
      <div class="lesson-deck">
        <section class="lesson-slide">
          <span>1</span>
          <div>
            <strong>今天目标：把状态说清楚</strong>
            <p>主系表结构是 Subject + Linking Verb + Complement。它不强调“做动作”，而是说明“是什么、怎么样、听起来如何、看起来如何”。</p>
          </div>
        </section>
        <section class="lesson-slide">
          <span>2</span>
          <div>
            <strong>常见系动词</strong>
            <ul>
              <li>be: Reading is useful.</li>
              <li>seem: The task seems difficult.</li>
              <li>become: My answer becomes clearer after practice.</li>
              <li>sound/look/feel: The idea sounds reasonable.</li>
            </ul>
          </div>
        </section>
        <section class="lesson-slide">
          <span>3</span>
          <div>
            <strong>表语可以是什么</strong>
            <p>表语可以是形容词、名词或短语。比如 useful / informative / a good habit / beneficial for students。口语里主系表很常用，因为它能快速表达观点。</p>
          </div>
        </section>
        <section class="lesson-slide wide-slide">
          <span>4</span>
          <div>
            <strong>雅思口语句子模板</strong>
            <ul>
              <li>Reading is useful because it helps me learn new ideas.</li>
              <li>Vocabulary review is an effective habit.</li>
              <li>My answer sounds clearer when I give an example.</li>
              <li>This book is informative and easy to understand.</li>
            </ul>
          </div>
        </section>
        <section class="lesson-slide wide-slide">
          <span>5</span>
          <div>
            <strong>口语回答顺序</strong>
            <p>先用主系表给观点：Reading is useful. 再补原因：It is beneficial because... 最后给例子：For example, I can learn vocabulary from stories.</p>
          </div>
        </section>
        <section class="lesson-slide wide-slide">
          <span>6</span>
          <div>
            <strong>今天完成标准</strong>
            <p>能区分动作句和状态句；能正确使用 is/are/was/were；能在口语答案里自然说出 4 个主系表句子。</p>
          </div>
        </section>
      </div>
    `;
  }

  if (point === "there be") {
    return `
      <div class="lesson-deck">
        <section class="lesson-slide">
          <span>1</span>
          <div>
            <strong>今天目标：描述“有/存在”</strong>
            <p>there be 用来表示某处、某时或某个话题里“有某物”。句型是 There + be + noun + place/time/detail。</p>
          </div>
        </section>
        <section class="lesson-slide">
          <span>2</span>
          <div>
            <strong>be 动词跟后面的名词走</strong>
            <ul>
              <li>There is one reason for this trend.</li>
              <li>There are many benefits of reading.</li>
              <li>There was a sharp increase in 2020.</li>
              <li>There were several changes after 2018.</li>
            </ul>
          </div>
        </section>
        <section class="lesson-slide">
          <span>3</span>
          <div>
            <strong>Task 1 常用方式</strong>
            <p>描述图表时，there be 可以写变化：There was an increase in online learning. / There were two main changes. 注意过去年份通常用 was/were。</p>
          </div>
        </section>
        <section class="lesson-slide wide-slide">
          <span>4</span>
          <div>
            <strong>不要和 have 混用</strong>
            <ul>
              <li>正确：There are many students in the class.</li>
              <li>正确：The class has many students.</li>
              <li>不自然：There have many students in the class.</li>
            </ul>
          </div>
        </section>
        <section class="lesson-slide wide-slide">
          <span>5</span>
          <div>
            <strong>写作小模板</strong>
            <p>There was a rise in app usage from 2020 to 2024. There were two possible reasons. First, online tools were convenient. Second, regular review helped students remember vocabulary.</p>
          </div>
        </section>
        <section class="lesson-slide wide-slide">
          <span>6</span>
          <div>
            <strong>今天完成标准</strong>
            <p>能根据单数/复数选择 is/are；能根据现在/过去选择 is/are 或 was/were；能用 there be 写 5 个 Task 1 描述句。</p>
          </div>
        </section>
      </div>
    `;
  }

  const plannedLesson = renderLessonPlan(point);
  if (plannedLesson) return plannedLesson;

  const core = grammarExplanation(point);
  const lessonExamples = {
    主谓宾: ["Students review vocabulary.", "Reading books improves writing.", "Parents guide children."],
    主系表: ["Reading is useful.", "The chart is clear.", "His answer sounds natural."],
    "there be": ["There was a sharp increase in 2002.", "There are many reasons for this problem.", "There is no need to predict the future in Task 1."],
    单复数和数字单位: ["70 billion calls", "three thousand students", "billions of people"],
    一般现在和现在进行: ["Many students use apps every day.", "A student is reviewing vocabulary now.", "Technology changes the way people learn."],
    一般过去和过去进行: ["The number increased in 2002.", "People were using landlines more often in 1995.", "The chart showed a clear trend."],
    完成时和将来时: ["I have studied English for six years.", "I have been learning piano for eight years.", "Schools will use more technology in the future."],
    简单句与复合句: ["Advertising is useful. It helps children learn.", "Advertising is useful because it helps children learn.", "Parents should guide children when they watch advertisements."],
    原因和时间从句: ["Students improve because they review mistakes.", "When children read books, they learn new ideas.", "Because the chart is about the past, we use past tense."],
    宾语从句: ["I think that reading is important.", "Many people believe that parents should guide children.", "The chart shows that mobile calls increased."],
    定语从句: ["Students who review mistakes improve faster.", "Books that teach culture are useful.", "A teacher who gives clear feedback can help students."],
    被动语态: ["Books are written by authors.", "Children should be guided by parents.", "The data was collected from 1995 to 2002."],
    比较和趋势表达: ["Mobile calls increased more quickly than local calls.", "The figure reached a peak in 2002.", "By contrast, landline calls decreased gradually."],
    连接词和四段结构: ["First, advertisements can teach children new things.", "However, some adverts may encourage children to waste money.", "Therefore, parents should provide guidance."],
  };
  const examples = lessonExamples[point] || ["A complete sentence needs a subject and a verb.", "Use grammar to make ideas clear.", "Accuracy comes before complexity."];
  return `
    <div class="lesson-deck">
      <section class="lesson-slide">
        <span>1</span>
        <div>
          <strong>核心规则</strong>
          <p>${core}</p>
        </div>
      </section>
      <section class="lesson-slide">
        <span>2</span>
        <div>
          <strong>雅思里怎么用</strong>
          <p>${week.ielts} 今天不是背规则，而是把规则放进口语和写作句子里。</p>
        </div>
      </section>
      <section class="lesson-slide">
        <span>3</span>
        <div>
          <strong>常见提醒</strong>
          <p>${week.alexFocus}。做题时先停 3 秒，检查主语、动词、时态和句号。</p>
        </div>
      </section>
      <section class="lesson-slide wide-slide">
        <span>4</span>
        <div>
          <strong>例句拆解</strong>
          <ul>
            ${examples.map((example) => `<li>${example}</li>`).join("")}
          </ul>
        </div>
      </section>
      <section class="lesson-slide wide-slide">
        <span>5</span>
        <div>
          <strong>15 分钟学习要求</strong>
          <p>读规则 2 分钟，抄 2 个正确例句，口头造 2 个自己的句子，再进入 10 题练习。不能只看一眼就点完成。</p>
        </div>
      </section>
    </div>
  `;
}

const writingGuides = {
  1: ["先写 6-8 句，不追求长。每句写完后检查：谁 + 做什么 + 对什么。", "1 观点句；2 原因句；3 例子句；4 第二个原因；5 小结句。", "Daily review helps students remember vocabulary. / It improves accuracy. / For example, students can review difficult words after school."],
  3: ["假设图表显示 2020-2024 年学习 App 使用人数上升。写 5-7 句，重点练 there be。", "2020: 20 students；2022: 45 students；2024: 80 students。", "There was a steady increase. / There were 20 students in 2020. / There was a larger number in 2024."],
  5: ["写一个 Task 2 主体段，说明 regular practice 为什么能提高英语。重点区分一般现在和现在进行。", "Topic sentence + reason + example + mini conclusion。", "Regular practice improves accuracy. / Many students are using apps this summer. / This habit helps learners retain vocabulary."],
  7: ["写一个 Task 1 小报告，描述一个从过去持续到现在的学习习惯，并说明未来计划。", "Past start + present result + future plan。", "The student has reviewed vocabulary for two weeks. / The habit has improved accuracy. / He is going to continue this routine."],
  9: ["写一个 Task 2 主体段：为什么复习错题能帮助学生进步。重点使用 because/when/after。", "观点句 + because 原因 + when/after 时间关系 + 例子。", "Students improve because they notice patterns. / When they review mistakes, they avoid repeating them. / After practice, their answers become clearer."],
  11: ["写一个小段落，描述能帮助学生进步的老师。重点使用 who/that/which 定语从句。", "先介绍老师类型，再解释具体帮助，再给例子。", "A teacher who gives clear feedback can improve students' confidence. / Lessons that include examples are easier to follow."],
  13: ["写一个 Task 1 小报告，比较两种学习方式：apps 和 textbooks。重点使用比较和趋势表达。", "Apps: 30% -> 65%；textbooks: 60% -> 45%。写 6-8 句。", "App use increased more quickly than textbook use. / In contrast, textbook use decreased gradually. / The two figures were 65% and 45%, respectively."],
};

const speakingGuides = {
  2: ["Answer：Yes, I do. Reading is useful.", "Reason：It is informative and relaxing.", "Example：For example, I can learn new vocabulary from stories.", "Grammar focus：至少 4 个主系表句子。"],
  4: ["Describe：who the teacher is, what subject they teach, and why they are useful.", "Use plural nouns：clear examples, useful methods, good explanations.", "Number phrase：two reasons, three examples, many students.", "Grammar focus：单复数和数字单位。"],
  6: ["Answer why online learning became popular.", "Use past simple：It became popular because it was convenient.", "Use past continuous：Many students were studying at home.", "Grammar focus：过去事实和过去背景动作。"],
  8: ["Answer preference directly：I prefer longer answers because...", "Give a simple sentence first, then a complex sentence with because/when.", "Example：Short answers are clear, but longer answers can show more detail.", "Grammar focus：简单句和复合句。"],
  10: ["Answer with object clauses：I think that parents should guide children online.", "Use know/believe/show：Many people believe that online learning is useful.", "Avoid question order：I know why students like apps.", "Grammar focus：宾语从句陈述语序。"],
  12: ["Describe a book: title, author, content, and why it was useful.", "Use passive：The book was written by... / It was published in...", "Then switch to active：It teaches readers about...", "Grammar focus：主动和被动自然切换。"],
  14: ["Answer with four parts：opinion, reason, example, conclusion.", "Use connectors：however, therefore, for example, in conclusion.", "Give both exam skills and communication skills.", "Grammar focus：连接词和清楚结构。"],
};

Object.assign(writingGuides, {
  15: ["写 Task 1 overview，只写总趋势，不写具体数字。", "第一句：整体趋势；第二句：最大变化或主要对比。", "Overall, app use increased significantly, while textbook use declined gradually."],
  17: ["写 Task 2 观点段：学生是否应该每天使用学习 App。", "Topic sentence + reason + example + mini conclusion。", "One important reason is that learning apps make review more convenient."],
  19: ["把一段散乱文字改成连贯段落。", "先写 topic sentence，再放 reason/example，最后小结。", "However / Therefore / For example / In addition 必须表达真实逻辑。"],
  21: ["修改昨天或前几天保存的一段作文。", "按任务回应、段落结构、句子准确、词汇拼写四步修改。", "保存原稿和修改版，方便家长看板后续评分。"],
  23: ["听力地图题输出：根据方位词写 6 句地点描述。", "先写起点，再写路线，再写最终位置。", "The cafe is opposite the library and next to the main entrance."],
  25: ["听力讲座笔记输出：把讲座提纲补成 6 句总结。", "每句包含一个主题词和一个结果/例子。", "The lecture explains how regular review strengthens long-term memory."],
  27: ["阅读匹配题输出：为 5 个段落写 heading。", "标题要概括整段，不要只抓一个细节。", "A practical method for improving vocabulary memory."],
});

Object.assign(speakingGuides, {
  16: ["Explain one chart detail aloud.", "Use from...to, higher than, whereas.", "Example：App use rose from 30% to 65%, whereas textbook use fell.", "Focus：数据表达清楚，不乱编原因。"],
  18: ["Give your opinion on learning apps.", "Answer directly, then give one reason and one example.", "Use：I believe that... / One reason is that...", "Focus：观点不要摇摆。"],
  20: ["Talk about vocabulary improvement.", "Use precise words: effective, practical, beneficial, accurate.", "Give one before/after example.", "Focus：不要重复 good/useful。"],
  22: ["Practise spelling information aloud.", "Say names, phone numbers, dates, and prices clearly.", "Use：Could you repeat that? / Is that B for boy?", "Focus：听力 Section 1 的信息准确。"],
  24: ["Explain an academic discussion.", "Say who agrees, who disagrees, and what suggestion is made.", "Use：The student suggests that... / The tutor recommends...", "Focus：区分不同说话人的观点。"],
  26: ["Summarise a reading paragraph.", "Give the main idea in one sentence, then one key detail.", "Use：This paragraph mainly discusses...", "Focus：主旨和细节分开。"],
  28: ["Explain why an answer is True, False, or Not Given.", "Quote or paraphrase the evidence.", "Use：The text states that... / The passage does not mention...", "Focus：不用常识判断。"],
  29: ["Answer Part 1 questions about school, reading, and technology.", "Use answer + reason + example.", "Keep each answer 3-4 sentences.", "Focus：直接、自然、不卡太久。"],
  30: ["Prepare a Part 2 one-minute talk.", "Use notes: what/who, when/where, details, why.", "Record 5 keywords and 3 strong sentences.", "Focus：讲故事顺序清楚。"],
});

function renderWritingTask(prompt) {
  const guide = writingGuides[state.day];
  return `
    <p class="lead">${prompt}</p>
    ${
      guide
        ? `
          <div class="example-box">
            <p><strong>今日写作支架：</strong>${guide[0]}</p>
            <p><strong>内容顺序：</strong>${guide[1]}</p>
            <p><strong>可用句型：</strong>${guide[2]}</p>
          </div>
        `
        : ""
    }
    <div class="writing-frame">
      <span>写作检查</span>
      <ol>
        <li>每句有主语和谓语。</li>
        <li>写完一个意思就打句号。</li>
        <li>至少使用 2 个连接词。</li>
        <li>至少使用 3 个今日词汇。</li>
      </ol>
    </div>
    <textarea id="dailyDraft" rows="9" placeholder="Write your answer here...">${state[`draftDay${state.day}`] || ""}</textarea>
    <button id="saveDraft" class="ghost" type="button">保存</button>
  `;
}

function renderSpeakingTask(prompt) {
  const guide = speakingGuides[state.day] || ["Answer：直接回答。", "Reason：说明原因。", "Example：给一个例子。", "Grammar focus：使用今日语法点。"];
  return `
    <p class="lead">${prompt}</p>
    <div class="speaking-board">
      <div>
        <strong>提纲</strong>
        <ul>
          ${guide.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
      <div>
        <strong>说完自查</strong>
        <ul>
          <li>有没有停顿太久？</li>
          <li>有没有一直重复 and？</li>
          <li>有没有至少 3 句完整句？</li>
        </ul>
      </div>
    </div>
    <textarea id="dailyDraft" rows="7" placeholder="写关键词或说完后记下 3 个关键句，不用写成长作文。">${state[`draftDay${state.day}`] || ""}</textarea>
    <button id="saveDraft" class="ghost" type="button">保存</button>
  `;
}

const practiceBank = {
  单复数和数字单位: [
    { q: "Choose the correct phrase.", options: ["many good teachers", "many goods teachers", "much good teachers"], answer: 0 },
    { q: "Choose the correct number phrase.", options: ["70 billions calls", "70 billion calls", "70 billion of calls"], answer: 1 },
    { q: "Which noun is usually uncountable?", options: ["teacher", "student", "knowledge"], answer: 2 },
    { q: "Choose the correct sentence.", options: ["There are many informations.", "There is much useful information.", "There are much information."], answer: 1 },
    { q: "Choose the correct generic phrase.", options: ["billions of people", "70 billions people", "three billions people"], answer: 0 },
    { q: "Which phrase is correct?", options: ["a piece of advice", "an advice", "many advices"], answer: 0 },
    { q: "Choose the correct Task 1 sentence.", options: ["The figure rose to 20 millions.", "The figure rose to 20 million.", "The figure rose to 20 million of."], answer: 1 },
    { q: "Which sentence uses a plural noun correctly?", options: ["Students need clear examples.", "Student need clear examples.", "Students needs clear examples."], answer: 0 },
    { q: "Choose the correct phrase.", options: ["much evidence", "many evidences", "an evidence"], answer: 0 },
    { q: "Which sentence is best?", options: ["The number of student increased.", "The number of students increased.", "The numbers of student increased."], answer: 1 },
  ],
  一般现在和现在进行: [
    { q: "Choose the habit sentence.", options: ["Students review words every day.", "Students are review words every day.", "Students reviewing words every day."], answer: 0 },
    { q: "Choose the sentence about now.", options: ["He practises every week.", "He is practising now.", "He practise now."], answer: 1 },
    { q: "Choose the correct third-person verb.", options: ["This method help students.", "This method helps students.", "This method helping students."], answer: 1 },
    { q: "Which sentence is a general opinion?", options: ["Reading improves vocabulary.", "Reading is improving vocabulary now.", "Reading improve vocabulary."], answer: 0 },
    { q: "Choose the correct present continuous form.", options: ["More students are using apps.", "More students using apps.", "More students is using apps."], answer: 0 },
    { q: "Which sentence is correct?", options: ["He does not like long answers.", "He do not like long answers.", "He is not like long answers."], answer: 0 },
    { q: "Choose the correct question.", options: ["Does this app help?", "Do this app help?", "Is this app help?"], answer: 0 },
    { q: "Choose the best Task 2 sentence.", options: ["Technology changes education.", "Technology is change education.", "Technology change education."], answer: 0 },
    { q: "Which phrase shows current action?", options: ["usually reviews", "is reviewing", "reviews every day"], answer: 1 },
    { q: "Choose the correct sentence.", options: ["Parents guide children online.", "Parents guides children online.", "Parents are guide children online."], answer: 0 },
  ],
  一般过去和过去进行: [
    { q: "Choose the past simple sentence.", options: ["The figure increased in 2020.", "The figure increases in 2020.", "The figure was increase in 2020."], answer: 0 },
    { q: "Choose the past continuous sentence.", options: ["I was reviewing words at 8 pm.", "I reviewed words at 8 pm.", "I am reviewing words yesterday."], answer: 0 },
    { q: "Which sentence is best for a past chart?", options: ["Mobile calls increased between 1995 and 2002.", "Mobile calls will increase after 2002.", "Mobile calls are increasing in 1995."], answer: 0 },
    { q: "Choose the correct be verb.", options: ["People was studying online.", "People were studying online.", "People is studying online."], answer: 1 },
    { q: "Choose the correct past form.", options: ["The number reached a peak.", "The number reach a peak.", "The number was reach a peak."], answer: 0 },
    { q: "Which sentence describes background action?", options: ["Students were using apps during the class.", "Students use apps yesterday.", "Students are using apps in 2020."], answer: 0 },
    { q: "Choose the correct negative sentence.", options: ["The figure did not increase.", "The figure did not increased.", "The figure was not increase."], answer: 0 },
    { q: "Choose the correct question.", options: ["Did the number fall?", "Did the number fell?", "Was the number fall?"], answer: 0 },
    { q: "Which sentence keeps past tense?", options: ["The chart showed a rise.", "The chart shows a rise in 2000.", "The chart will show a rise."], answer: 0 },
    { q: "Choose the better sentence.", options: ["The line had a slight fall.", "The line have a slight fall.", "The line having a slight fall."], answer: 0 },
  ],
  完成时和将来时: [
    { q: "Choose the present perfect sentence.", options: ["I have learned many words.", "I learned many words tomorrow.", "I have learn many words."], answer: 0 },
    { q: "Choose the present perfect continuous sentence.", options: ["I have been studying English for six years.", "I study English for six years.", "I am study English for six years."], answer: 0 },
    { q: "Choose the correct has/have.", options: ["The number has increased.", "The number have increased.", "The number has increase."], answer: 0 },
    { q: "Which sentence shows a future plan?", options: ["I am going to review words daily.", "I have reviewed words yesterday.", "I reviewing words tomorrow."], answer: 0 },
    { q: "Which Task 1 sentence avoids guessing?", options: ["The figure increased by 2024.", "The figure will increase after 2024.", "Maybe the figure will rise later."], answer: 0 },
    { q: "Choose the correct future form.", options: ["Schools will use more technology.", "Schools will using more technology.", "Schools uses more technology tomorrow."], answer: 0 },
    { q: "Choose the correct since/for sentence.", options: ["I have studied English for six years.", "I have studied English since six years.", "I studied English since six years."], answer: 0 },
    { q: "Which sentence is correct?", options: ["She has finished the task.", "She have finished the task.", "She has finish the task."], answer: 0 },
    { q: "Choose the better speaking sentence.", options: ["I have been learning piano since 2018.", "I learn piano for 2018.", "I am learn piano since 2018."], answer: 0 },
    { q: "Choose the correct prediction sentence.", options: ["Online learning may become more common.", "Online learning may becomes more common.", "Online learning may becoming more common."], answer: 0 },
  ],
  简单句与复合句: [
    { q: "Which is a simple sentence?", options: ["Reading improves vocabulary.", "Because reading improves vocabulary.", "When reading improves vocabulary."], answer: 0 },
    { q: "Which is a complete complex sentence?", options: ["Because students review words.", "Students improve because they review words.", "Because improve words."], answer: 1 },
    { q: "Combine the ideas correctly.", options: ["Reading is useful because it teaches ideas.", "Reading is useful because teaches ideas.", "Because reading useful teaches ideas."], answer: 0 },
    { q: "Which sentence avoids a fragment?", options: ["When students practise daily, they improve.", "When students practise daily.", "Because daily practice."], answer: 0 },
    { q: "Choose the correct connector.", options: ["Students review words because they want to remember them.", "Students review words because remember.", "Students review words because."], answer: 0 },
    { q: "Which sentence should be split or connected?", options: ["Advertising is useful it teaches children.", "Advertising is useful because it teaches children.", "Advertising teaches children."], answer: 0 },
    { q: "Choose the best sentence.", options: ["Apps are convenient, and they help students review.", "Apps convenient and help review.", "And apps are convenient."], answer: 0 },
    { q: "Which has a clear main clause?", options: ["Although the task is difficult, students can finish it.", "Although the task is difficult.", "Although difficult task."], answer: 0 },
    { q: "Choose the correct because sentence.", options: ["Because reading is useful, students should read.", "Because reading is useful.", "Because useful students read."], answer: 0 },
    { q: "Which sentence is ready for IELTS?", options: ["Students can improve when they receive feedback.", "When receive feedback improve.", "Students when feedback."], answer: 0 },
  ],
  原因和时间从句: [
    { q: "Choose the reason clause.", options: ["because it saves time", "when it saves time", "which it saves time"], answer: 0 },
    { q: "Choose the time clause.", options: ["when students review words", "because students review words", "that students review words"], answer: 0 },
    { q: "Which sentence is complete?", options: ["Because feedback is useful.", "Students improve because feedback is useful.", "Because useful feedback."], answer: 1 },
    { q: "Choose the correct comma sentence.", options: ["When students practise, they improve.", "When students practise they improve.", "When students practise, improve."], answer: 0 },
    { q: "Choose the best sentence.", options: ["After students finish homework, they can review words.", "After students finish homework.", "After finish homework review words."], answer: 0 },
    { q: "Which connector gives a reason?", options: ["because", "when", "before"], answer: 0 },
    { q: "Which connector gives time?", options: ["therefore", "after", "because"], answer: 1 },
    { q: "Choose the correct sentence.", options: ["Students remember words better when they review them.", "Students remember words better when review.", "Students when they review remember."], answer: 0 },
    { q: "Which sentence is natural?", options: ["Since online learning is flexible, many students like it.", "Since flexible online learning.", "Since online learning flexible many like."], answer: 0 },
    { q: "Choose the correct while sentence.", options: ["While I was studying, I took notes.", "While I studying, I took notes.", "While studying took notes."], answer: 0 },
  ],
  宾语从句: [
    { q: "Choose the correct object clause.", options: ["I think that reading is useful.", "I think that is reading useful.", "I think reading useful."], answer: 0 },
    { q: "Which sentence uses statement word order?", options: ["I know why students like apps.", "I know why do students like apps.", "I know why like students apps."], answer: 0 },
    { q: "Choose the chart sentence.", options: ["The chart shows that app use increased.", "The chart shows that did app use increase.", "The chart shows app use increase yesterday."], answer: 0 },
    { q: "Which verb can introduce an object clause?", options: ["believe", "because", "although"], answer: 0 },
    { q: "Choose the correct opinion sentence.", options: ["Many people believe that parents should guide children.", "Many people believe should parents guide children.", "Many people believe that should guide parents."], answer: 0 },
    { q: "Which sentence is natural in speaking?", options: ["I think reading helps me relax.", "I think does reading help me relax.", "I think reading help me relaxing."], answer: 0 },
    { q: "Choose the correct sentence.", options: ["The data suggests that the method is effective.", "The data suggests that is the method effective.", "The data suggests effective method."], answer: 0 },
    { q: "Which sentence avoids a question order mistake?", options: ["I understand why grammar matters.", "I understand why does grammar matter.", "I understand why matters grammar."], answer: 0 },
    { q: "Choose the correct that-clause.", options: ["Teachers know that practice builds confidence.", "Teachers know that builds practice confidence.", "Teachers know that practice build confidence."], answer: 0 },
    { q: "Which sentence is best for Task 2?", options: ["I believe that schools should teach communication skills.", "I believe should schools teach communication skills.", "I believe that teach schools skills."], answer: 0 },
  ],
  定语从句: [
    { q: "Choose the correct who clause.", options: ["Students who review mistakes improve faster.", "Students which review mistakes improve faster.", "Students who reviews mistakes improve faster."], answer: 0 },
    { q: "Choose the correct which clause.", options: ["Books which contain examples are helpful.", "Books who contain examples are helpful.", "Books which contains examples are helpful."], answer: 0 },
    { q: "Which sentence uses that correctly?", options: ["The method that works best is regular review.", "The method that work best is regular review.", "The method what works best is regular review."], answer: 0 },
    { q: "Which relative pronoun refers to people?", options: ["who", "which", "where"], answer: 0 },
    { q: "Which relative pronoun refers to things?", options: ["which", "who", "whose people"], answer: 0 },
    { q: "Choose the best sentence.", options: ["A teacher who gives feedback can help students.", "A teacher which gives feedback can help students.", "A teacher who give feedback can help students."], answer: 0 },
    { q: "Which sentence is natural?", options: ["This is a book that teaches culture.", "This is a book who teaches culture.", "This is a book that teach culture."], answer: 0 },
    { q: "Choose the clear relative clause.", options: ["The app which I use daily is effective.", "The app which daily effective.", "The app who I use daily is effective."], answer: 0 },
    { q: "Which sentence avoids repetition?", options: ["Students who practise daily become confident.", "Students they practise daily become confident.", "Students practise daily they become confident."], answer: 0 },
    { q: "Choose the best IELTS sentence.", options: ["Children who receive guidance can use apps safely.", "Children which receive guidance can use apps safely.", "Children who receives guidance can use apps safely."], answer: 0 },
  ],
  被动语态: [
    { q: "Choose the passive sentence.", options: ["Books are written by authors.", "Books write authors.", "Books are wrote by authors."], answer: 0 },
    { q: "Choose the correct form.", options: ["The data was collected in 2020.", "The data collected in 2020 by.", "The data was collect in 2020."], answer: 0 },
    { q: "Which sentence uses should be + done?", options: ["Children should be guided by parents.", "Children should guide by parents.", "Children should be guide by parents."], answer: 0 },
    { q: "Choose the active sentence.", options: ["Teachers give feedback.", "Feedback is given by teachers.", "Students are encouraged by teachers."], answer: 0 },
    { q: "Choose the correct passive with plural subject.", options: ["Many books are published every year.", "Many books is published every year.", "Many books are publish every year."], answer: 0 },
    { q: "Which sentence is suitable for Task 1?", options: ["The survey was conducted in 2024.", "The survey conducted was in 2024 by.", "The survey was conduct in 2024."], answer: 0 },
    { q: "Choose the correct by phrase.", options: ["The story was written by a famous author.", "The story was written with a famous author.", "The story was wrote by a famous author."], answer: 0 },
    { q: "Which sentence can omit the doer?", options: ["Many apps are used in schools.", "Many apps use schools.", "Many apps are using schools."], answer: 0 },
    { q: "Choose the correct tense.", options: ["The lesson is designed for IELTS practice.", "The lesson designed for IELTS practice.", "The lesson is design for IELTS practice."], answer: 0 },
    { q: "Which sentence is best?", options: ["Students are encouraged to read regularly.", "Students encouraged to read regularly.", "Students are encourage to read regularly."], answer: 0 },
  ],
  比较和趋势表达: [
    { q: "Choose the correct comparison.", options: ["Online learning is more flexible than classroom learning.", "Online learning is flexible than classroom learning.", "Online learning more flexible classroom learning."], answer: 0 },
    { q: "Choose the trend verb.", options: ["increase", "because", "teacher"], answer: 0 },
    { q: "Which sentence describes stability?", options: ["The figure remained stable.", "The figure stable remainedly.", "The figure was remain stable."], answer: 0 },
    { q: "Choose the correct peak sentence.", options: ["The number reached a peak in 2024.", "The number reached peak to 2024.", "The number reach a peak in 2024."], answer: 0 },
    { q: "Which connector shows contrast?", options: ["In contrast", "Therefore", "For example"], answer: 0 },
    { q: "Choose the correct while sentence.", options: ["App use increased, while book use remained stable.", "App use increased, while remained stable book use.", "App use increased while book use remain stable."], answer: 0 },
    { q: "Choose the correct respectively sentence.", options: ["A and B were 30% and 40%, respectively.", "A and B respectively were 30% and 40%.", "A and B were respectively."], answer: 0 },
    { q: "Which sentence uses approximately correctly?", options: ["The figure was approximately 50%.", "The figure approximately was by 50.", "The approximately figure was 50."], answer: 0 },
    { q: "Choose the better Task 1 sentence.", options: ["There was a gradual rise in sales.", "There was gradual rise sales.", "There had a gradual rise sales."], answer: 0 },
    { q: "Choose the correct comparison.", options: ["Mobile calls increased more quickly than local calls.", "Mobile calls increased quick than local calls.", "Mobile calls more increased than local calls."], answer: 0 },
  ],
  连接词和四段结构: [
    { q: "Which connector shows contrast?", options: ["however", "therefore", "for example"], answer: 0 },
    { q: "Which connector shows result?", options: ["therefore", "however", "although"], answer: 0 },
    { q: "Which connector gives an example?", options: ["for example", "in contrast", "therefore"], answer: 0 },
    { q: "Choose the usual Task 2 structure.", options: ["Introduction, body 1, body 2, conclusion", "Conclusion, example, title, word list", "Question, grammar, spelling, answer"], answer: 0 },
    { q: "What should a body paragraph start with?", options: ["A topic sentence", "A random example", "A new unrelated opinion"], answer: 0 },
    { q: "Choose the best sentence.", options: ["However, some adverts may encourage children to spend money.", "However some adverts may encourage children spend money.", "However adverts because spend money."], answer: 0 },
    { q: "Which sentence adds an example?", options: ["For example, students can review words on an app.", "Therefore, students can review words on an app.", "However, students can review words on an app."], answer: 0 },
    { q: "Which sentence gives a conclusion?", options: ["In conclusion, schools should teach both skills.", "For example, schools should teach both skills.", "However schools both skills."], answer: 0 },
    { q: "Choose the logical order.", options: ["Opinion -> reason -> example", "Example -> unrelated idea -> question", "Reason -> no topic -> new topic"], answer: 0 },
    { q: "Which connector adds another point?", options: ["In addition", "In contrast", "As a result"], answer: 0 },
  ],
};

const focusPracticeBank = {
  "Task 1 overview": [
    { q: "What should a Task 1 overview mainly describe?", options: ["Main trends and key comparisons", "Every exact number", "Personal opinions"], answer: 0 },
    { q: "Which sentence is an overview?", options: ["Overall, app use increased significantly.", "App use was 30% in 2020.", "I think apps are useful."], answer: 0 },
    { q: "What should usually NOT appear in an overview?", options: ["Too many exact figures", "The biggest change", "The overall trend"], answer: 0 },
    { q: "Choose the best overview word.", options: ["Overall", "Because", "For example"], answer: 0 },
    { q: "Which sentence compares two trends?", options: ["X rose, while Y fell.", "X was 20%.", "Y is useful."], answer: 0 },
    { q: "Which phrase means a large change?", options: ["a significant increase", "a small unchanged", "a reason example"], answer: 0 },
    { q: "Which detail belongs in a body paragraph?", options: ["The figure rose from 20% to 65%.", "Overall, the trend was upward.", "The most noticeable feature was growth."], answer: 0 },
    { q: "Which overview is too vague?", options: ["There were some changes.", "Overall, both figures increased.", "Overall, X rose while Y declined."], answer: 0 },
    { q: "Which word describes no major change?", options: ["stable", "dramatic", "sharp"], answer: 0 },
    { q: "Which sentence is academic and clear?", options: ["Overall, the number of users rose steadily.", "Overall, users got super many.", "Overall, I like the chart."], answer: 0 },
  ],
  "Task 1 details": [
    { q: "Which data sentence is correct?", options: ["The figure rose from 20% to 65%.", "The figure rose 20% to 65%.", "The figure rose from 20% at 65%."], answer: 0 },
    { q: "Which word introduces contrast?", options: ["whereas", "therefore", "for example"], answer: 0 },
    { q: "Which phrase means approximate?", options: ["approximately 50%", "respectively 50%", "stable 50%"], answer: 0 },
    { q: "Which sentence uses respectively correctly?", options: ["A and B were 30% and 40%, respectively.", "A and B respectively.", "Respectively A was 30%."], answer: 0 },
    { q: "What should details support?", options: ["The overview", "A personal opinion", "A new topic"], answer: 0 },
    { q: "Choose the accurate trend phrase.", options: ["a gradual decline", "a decline gradually figure", "declined by stable"], answer: 0 },
    { q: "Which point is worth selecting?", options: ["The highest figure", "Every tiny number", "The chart title only"], answer: 0 },
    { q: "Which sentence avoids guessing?", options: ["The figure declined after 2020.", "The figure declined because students were bored.", "The figure will decline later."], answer: 0 },
    { q: "Which phrase compares size?", options: ["higher than", "because of", "in order to"], answer: 0 },
    { q: "Choose the best detail sentence.", options: ["Textbook use fell slightly to 45%.", "Textbook use was bad.", "Textbook use because fell."], answer: 0 },
  ],
  "Task 2 opinion": [
    { q: "What should an opinion paragraph begin with?", options: ["A clear topic sentence", "An unrelated story", "A list of words"], answer: 0 },
    { q: "Which sentence gives a clear opinion?", options: ["Daily practice is essential for language learning.", "There are many things.", "Some people maybe."], answer: 0 },
    { q: "What comes after a topic sentence?", options: ["A reason", "A new unrelated topic", "The conclusion of the whole essay"], answer: 0 },
    { q: "Which phrase introduces an example?", options: ["For example", "However", "Overall"], answer: 0 },
    { q: "Which sentence supports the opinion?", options: ["This is because regular review strengthens memory.", "This chart shows a line.", "There are two categories."], answer: 0 },
    { q: "Which paragraph order is best?", options: ["Opinion, reason, example, mini conclusion", "Example, title, grammar term, question", "Conclusion, unrelated reason, topic"], answer: 0 },
    { q: "Which word is more academic than 'good'?", options: ["beneficial", "goods", "goodly"], answer: 0 },
    { q: "Which sentence is too vague?", options: ["It is good for many things.", "It improves vocabulary accuracy.", "It helps students review difficult words."], answer: 0 },
    { q: "Which mini conclusion is clear?", options: ["Therefore, daily review should be part of study routines.", "For example, a student.", "Because it."], answer: 0 },
    { q: "What should each body paragraph mainly develop?", options: ["One main idea", "Three unrelated ideas", "Only vocabulary"], answer: 0 },
  ],
  "Task 2 discussion": [
    { q: "What does a discussion essay need?", options: ["Both views and your opinion", "Only one side", "Only examples"], answer: 0 },
    { q: "Which phrase introduces one side?", options: ["Some people argue that", "Overall", "The number rose"], answer: 0 },
    { q: "Which phrase introduces another side?", options: ["Others believe that", "For one number", "Respectively"], answer: 0 },
    { q: "Which sentence gives your view?", options: ["I tend to agree with the second view.", "There was a peak.", "This paragraph has a chart."], answer: 0 },
    { q: "Which connector balances ideas?", options: ["On the other hand", "Therefore only", "For example only"], answer: 0 },
    { q: "Which paragraph plan is best?", options: ["View A, View B + your view", "Only View A twice", "Conclusion before reasons"], answer: 0 },
    { q: "Which sentence explains a view?", options: ["They believe classroom learning provides direct interaction.", "They classroom direct.", "Interaction is a map."], answer: 0 },
    { q: "Which mistake weakens discussion writing?", options: ["Ignoring one side", "Giving an example", "Using a topic sentence"], answer: 0 },
    { q: "Which phrase is useful for contrast?", options: ["however", "therefore", "for example"], answer: 0 },
    { q: "What should the conclusion do?", options: ["Summarise and state your position", "Introduce a new topic", "List all vocabulary"], answer: 0 },
  ],
  Coherence: [
    { q: "What does coherence mean?", options: ["Ideas are logically connected", "Words are very long", "The essay has no examples"], answer: 0 },
    { q: "Which connector shows result?", options: ["therefore", "however", "for example"], answer: 0 },
    { q: "Which connector shows contrast?", options: ["however", "therefore", "in addition"], answer: 0 },
    { q: "Which sentence should follow a topic sentence?", options: ["A reason that explains it", "A new unrelated topic", "A random number"], answer: 0 },
    { q: "Which paragraph is stronger?", options: ["One main idea with support", "Many unrelated ideas", "Only examples without a topic"], answer: 0 },
    { q: "What should pronouns refer to?", options: ["Clear previous nouns", "Unknown ideas", "Nothing"], answer: 0 },
    { q: "Which phrase adds information?", options: ["in addition", "in contrast", "as a result"], answer: 0 },
    { q: "Which problem hurts coherence?", options: ["Jumping between topics", "Using a topic sentence", "Giving an example"], answer: 0 },
    { q: "Which order is logical?", options: ["Topic -> reason -> example", "Example -> unrelated topic -> reason", "Conclusion -> topic -> question"], answer: 0 },
    { q: "What should each paragraph have?", options: ["A clear central idea", "Only difficult words", "No connection"], answer: 0 },
  ],
  "Lexical resource": [
    { q: "What does lexical resource assess?", options: ["Vocabulary range and accuracy", "Only handwriting", "Only essay length"], answer: 0 },
    { q: "Choose the best collocation.", options: ["make progress", "do progress", "create progress"], answer: 0 },
    { q: "Choose a precise replacement for 'good'.", options: ["beneficial", "goods", "gooding"], answer: 0 },
    { q: "Which phrase is natural?", options: ["gain knowledge", "get knowledges", "make knowledge"], answer: 0 },
    { q: "What should you avoid?", options: ["Using advanced words incorrectly", "Checking spelling", "Learning collocations"], answer: 0 },
    { q: "Choose the correct phrase.", options: ["provide guidance", "give guidances", "make guidance"], answer: 0 },
    { q: "Which word means clear and exact?", options: ["precise", "vague", "random"], answer: 0 },
    { q: "Which sentence uses vocabulary naturally?", options: ["Regular review improves accuracy.", "Regular review does accuracy.", "Regular review accurates writing."], answer: 0 },
    { q: "Which is a spelling-sensitive skill?", options: ["writing", "only speaking", "only drawing"], answer: 0 },
    { q: "What is better for IELTS?", options: ["Accurate collocations", "Hard words used wrongly", "Repeating good every sentence"], answer: 0 },
  ],
  "Writing review": [
    { q: "What should you check first?", options: ["Whether the task is answered", "One random spelling", "Font size"], answer: 0 },
    { q: "Which check belongs to paragraph review?", options: ["Each paragraph has one main idea", "Every word is long", "No examples are used"], answer: 0 },
    { q: "Which sentence problem should be fixed?", options: ["A run-on sentence", "A clear topic sentence", "A useful example"], answer: 0 },
    { q: "What should be saved for review?", options: ["Original and corrected sentences", "Only the score", "Only the title"], answer: 0 },
    { q: "Which step comes late?", options: ["Spelling check", "Answering the question", "Planning structure"], answer: 0 },
    { q: "What does proofreading catch?", options: ["Spelling and punctuation mistakes", "Only ideas", "Only speaking fluency"], answer: 0 },
    { q: "Which revision is useful?", options: ["Replace vague words with precise words", "Add unrelated ideas", "Remove all examples"], answer: 0 },
    { q: "Which sentence is corrected?", options: ["Advertising is useful. It teaches children.", "Advertising is useful it teaches children.", "Advertising useful teaches."], answer: 0 },
    { q: "What can parents review on the dashboard?", options: ["Saved drafts and scores", "Only the homepage", "Nothing"], answer: 0 },
    { q: "What is the goal of review day?", options: ["Improve a previous answer", "Avoid writing", "Memorise only one word"], answer: 0 },
  ],
};

const listeningReadingPractice = [
  { q: "In Listening Section 1, what is often tested?", options: ["Names, numbers, dates, prices", "Essay opinions", "Paragraph headings"], answer: 0 },
  { q: "What must you follow in note completion?", options: ["The word limit", "Your own opinion", "Chinese translation only"], answer: 0 },
  { q: "Which word is a map direction?", options: ["opposite", "overall", "therefore"], answer: 0 },
  { q: "What should you do before listening?", options: ["Predict the word type", "Close the question paper", "Write random answers"], answer: 0 },
  { q: "What is common in Section 3?", options: ["Academic discussion", "A personal form only", "Task 2 essay writing"], answer: 0 },
  { q: "Which phrase shows agreement?", options: ["I agree with that point", "The figure rose", "This paragraph"], answer: 0 },
  { q: "In Reading, what is skimming for?", options: ["Finding the main idea quickly", "Translating every word", "Memorising spelling"], answer: 0 },
  { q: "What is key in matching questions?", options: ["Paraphrase", "Only exact same words", "Personal experience"], answer: 0 },
  { q: "When is an answer Not Given?", options: ["The passage does not provide the information", "The answer feels false", "The word is difficult"], answer: 0 },
  { q: "What should support a True/False answer?", options: ["Text evidence", "A guess", "Your opinion"], answer: 0 },
];

const speakingPractice = [
  { q: "What is a strong Part 1 structure?", options: ["Answer + reason + example", "Only yes or no", "A memorised essay"], answer: 0 },
  { q: "How long should a Part 1 answer usually be here?", options: ["3-4 clear sentences", "One word", "Two minutes"], answer: 0 },
  { q: "What should Part 2 notes contain?", options: ["Keywords", "A full memorised script", "Only grammar terms"], answer: 0 },
  { q: "Which sentence extends an answer?", options: ["For example, I often read after school.", "Yes.", "Question."], answer: 0 },
  { q: "What helps fluency?", options: ["Clear sequence and examples", "Long silent pauses", "Only difficult words"], answer: 0 },
  { q: "Which phrase starts a story naturally?", options: ["I first came across it when...", "Overall, the chart...", "The data was collected..."], answer: 0 },
  { q: "What should Part 2 include at the end?", options: ["A feeling or reason why it matters", "Only a title", "A random number"], answer: 0 },
  { q: "Which topic is common in Part 1?", options: ["School", "Map labelling only", "Line chart overview"], answer: 0 },
  { q: "What is better than memorising a full answer?", options: ["Using flexible notes", "Reading silently", "Avoiding examples"], answer: 0 },
  { q: "Which answer is more natural?", options: ["Yes, I enjoy reading because it helps me relax.", "Yes reading because relax.", "Yes."], answer: 0 },
];
