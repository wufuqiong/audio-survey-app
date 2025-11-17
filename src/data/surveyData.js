// src/data/surveyData.js
export const surveyData = {
  title: "儿童兴趣调查问卷",
  description: "请听题并选择最符合的答案",
  questions: [
    {
      id: 1,
      text: "你最喜欢什么颜色？",
      type: "single",
      audioUrl: "/audio/color-question.mp3",
      options: [
        { id: 1, text: "红色", value: "red", audioUrl: "/audio/red.mp3" },
        { id: 2, text: "蓝色", value: "blue", audioUrl: "/audio/blue.mp3" },
        { id: 3, text: "绿色", value: "green", audioUrl: "/audio/green.mp3" },
        { id: 4, text: "黄色", value: "yellow", audioUrl: "/audio/yellow.mp3" }
      ]
    },
    {
      id: 2,
      text: "你最喜欢的动物是什么？",
      type: "single",
      audioUrl: "/audio/animal-question.mp3",
      options: [
        { id: 1, text: "小狗 🐶", value: "dog", audioUrl: "/audio/dog.mp3" },
        { id: 2, text: "小猫 🐱", value: "cat", audioUrl: "/audio/cat.mp3" },
        { id: 3, text: "小兔子 🐰", value: "rabbit", audioUrl: "/audio/rabbit.mp3" },
        { id: 4, text: "小熊 🐻", value: "bear", audioUrl: "/audio/bear.mp3" }
      ]
    },
    {
      id: 3,
      text: "你喜欢哪些活动？（可以多选）",
      type: "multiple",
      audioUrl: "/audio/activity-question.mp3",
      options: [
        { id: 1, text: "画画 🎨", value: "drawing", audioUrl: "/audio/drawing.mp3" },
        { id: 2, text: "唱歌 🎤", value: "singing", audioUrl: "/audio/singing.mp3" },
        { id: 3, text: "跳舞 💃", value: "dancing", audioUrl: "/audio/dancing.mp3" },
        { id: 4, text: "运动 ⚽", value: "sports", audioUrl: "/audio/sports.mp3" }
      ]
    }
  ]
};