<template>
  <div class="viewer-container">
    <!-- 展示 md 内容 -->
    <div ref="viewerRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"
// 引入 Toast UI Viewer
// @ts-ignore
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer"
import "@toast-ui/editor/dist/toastui-editor-viewer.css"
import "@toast-ui/editor/dist/i18n/zh-cn"

// highlight.js
import hljs from "highlight.js"
import "highlight.js/styles/github.css" // 你可以换成 atom-one-dark.css、vs2015.css 等主题

import useArticleStore from '../../../store/modules/articles'
const ArticleStore = useArticleStore()

import { useRoute } from 'vue-router'
const $route = useRoute()

const viewerRef = ref(null)
let viewerInstance: any = null

// 模拟传入的 Markdown 内容
let markdownContent: any

onMounted(() => {
  //获取文章
  getArticle()

})

//获取指定文章
const getArticle = async () => {
  await ArticleStore.getArticle($route.query.id)
  markdownContent = ArticleStore.article
  createViewer()
}
//创建展示器
const createViewer = () => {

  viewerInstance = new Viewer({
    el: viewerRef.value,
    initialValue: markdownContent,
    language: "zh"
  })

  // 给代码块加高亮
  setTimeout(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block as HTMLElement)
    })
  })
}

onBeforeUnmount(() => {
  if (viewerInstance) {
    viewerInstance.destroy()
    viewerInstance = null
  }
})
</script>

<style>
.viewer-container {
  max-width: 80%;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
}

/* ===========================
   Toast UI Viewer 美化
   =========================== */
.toastui-editor-contents {
  font-family: "Inter", "PingFang SC", "Microsoft YaHei", sans-serif !important;
  font-size: 16px !important;
  line-height: 1.75;
  color: #2c3e50;
  word-break: break-word;
}

/* 标题优化 */
.toastui-editor-contents h1,
.toastui-editor-contents h2,
.toastui-editor-contents h3 {
  font-weight: 600;
  line-height: 1.4;
  margin: 1.2em 0 0.6em;
  color: #222;
}

.toastui-editor-contents h1 {
  font-size: 2em;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.3em;
}

.toastui-editor-contents h2 {
  font-size: 1.6em;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.2em;
}

.toastui-editor-contents h3 {
  font-size: 1.3em;
}

/* 段落 */
.toastui-editor-contents p {
  margin: 0.8em 0;
}

/* 链接 */
.toastui-editor-contents a {
  color: #409eff;
  text-decoration: none;
}

.toastui-editor-contents a:hover {
  text-decoration: underline;
}

/* 列表 */
.toastui-editor-contents ul,
.toastui-editor-contents ol {
  padding-left: 1.6em;
  margin: 0.6em 0;
}

/* 引用 */
.toastui-editor-contents blockquote {
  margin: 1em 0;
  padding: 0.5em 1em;
  border-left: 4px solid #409eff;
  background: #f9f9f9;
  color: #555;
  border-radius: 4px;
}

/* 代码块（高亮容器） */
.toastui-editor-contents pre code {
  font-family: "Fira Code", "JetBrains Mono", monospace !important;
  font-size: 14px;
  border-radius: 6px;
}

/* 表格 */
.toastui-editor-contents table {
  border-collapse: collapse;
  margin: 1em 0;
  width: 100%;
}

.toastui-editor-contents th,
.toastui-editor-contents td {
  border: 1px solid #ddd;
  padding: 8px 12px;
}

.toastui-editor-contents th {
  background: #f5f7fa;
  font-weight: 600;
  text-align: left;
}

/* 图片 */
.toastui-editor-contents img {
  max-width: 100%;
  border-radius: 6px;
  margin: 0.6em 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}
</style>
