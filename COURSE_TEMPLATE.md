# Alex IELTS Learning Site Template

这个项目现在可以当作一个轻量英语学习站模板使用。核心交互已经和 IELTS 内容分开到几个清晰区域；以后换成新概念、校内英语或其他课程时，优先替换内容数据，不要重写流程。

## 文件分工

- `index.html`：页面结构和模块入口。通常只需要改导航名称或新增/删除大模块。
- `styles.css`：视觉样式和 iPad/手机适配。换课程时一般不用动。
- `course-data.js`：课程内容、课件、题库、输出任务和内置备用词库。换教材时主要改这里。
- `app.js`：学习流程、练习判分、保存记录、家长看板、导入导出。尽量不要为换教材改这里。
- `vocab-data.js`：学生每日词库。换教材时优先替换这个文件。

## 主要内容入口

在 `course-data.js` 可以替换这些内容：

- `courseWeeks`：课程周计划、每天的新课标题、阶段目标。
- `writingPrompts`：每天写作/口语/听读输出任务。
- `alexMistakes`：复习环节的句子改错材料。
- `lessonPlans`：语法课件内容。
- `skillLessonPlans`：写作、听力、阅读、口语技能课件。
- `practiceBank` / `focusPracticeBank`：10 题练习题库。
- `writingGuides` / `speakingGuides`：输出任务支架。
- `vocabularySource`：内置备用词库；正式词库优先使用 `vocab-data.js`。

## 可复用功能

这些功能已经和 IELTS 内容弱绑定，未来可以继续复用：

- 每天 5 步流程：复习、新课、练习、输出、新词。
- 练习题自动计分。
- 写作/口语内容本地保存。
- 家长看板展示每日分数和完成度。
- 保存内容一键复制。
- 学习记录导出/导入。
- 单词选择意思 + 拼写检查 + 错词二刷。
- 已掌握词随机抽查。

## 换成新课程时建议步骤

1. 复制整个文件夹，改项目名。
2. 替换 `courseWeeks` 和 `writingPrompts`，确定每天学什么。
3. 替换 `lessonPlans` 和练习题库。
4. 生成新的 `vocab-data.js`。
5. 确认 `index.html` 的脚本顺序仍然是 `course-data.js`、`vocab-data.js`、`app.js`。
6. 跑一遍 Day 1 流程，确认分数、保存、复制、导出导入都正常。

## 目前保存方式

学习记录保存在浏览器本地 `localStorage`。家长看板提供：

- `导出记录`：下载 JSON 备份。
- `导入记录`：选择 JSON 恢复进度。

如果以后需要多设备自动同步，再考虑 Firebase、Supabase 或一个小型后端服务。
