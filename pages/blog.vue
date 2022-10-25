<template>
    <div class="blog position-relative overflow-hidden" v-html="markdownText">

    </div>
</template>
<style scoped>
.blog{
  color: black;
  background: white;
}
</style>
<script setup>
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import {useAsyncData} from "nuxt/app";
const { data } = await useAsyncData('count', () => $fetch('http://localhost:3000/INSTALL.md'))

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: (code, lang) => {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartypants: false,
  xhtml: false
});

const markdownText = marked.parse(data.value)
</script>