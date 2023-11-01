<template>
    <div class="inline-flex flex-col justify-center items-center max-w-[100%]">

        <h2 class="text-center">
            <code>align</code>
        </h2>
        <h4>
            make your code elegant
        </h4>
  <div class="relative p-0 whitespace-nowrap inline-block max-w-[100%] overflow-auto" @mousemove="hoov"  @touchmove="hoov" @drag="hoov" @click="hoov">
      <div class="shidden">
<!--          <div class="content-right">-->
<!--              <div class="code-example bad">-->
<!--                  Content for the left div-->
<!--              </div>-->
<!--          </div>-->

          <div class="content-left">
              <div class="code-example good">

<pre class="theme-atom-one-dark shadow-3xl text-sm relative overflow-visible max-w-full tab-size h-full"><span class="hljs mb-0 block min-h-full"><code>      <span class="hljs-keyword">let</span> foo
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> bar <span class="hljs-keyword">in</span> <span class="hljs-variable language_">this</span>)
<span class="hljs-keyword">yield</span> <span class="hljs-literal">true</span></code></span></pre>

              </div>
          </div>
      </div>
      <div class="shown">
    <div class="content-right">
        <div class="code-example bad">

<pre class="theme-atom-one-dark shadow-3xl text-sm relative overflow-hidden max-w-full tab-size h-full"><span class="hljs mb-0 block min-h-full overflow-hidden"><code><span class="hljs-keyword">let</span> foo
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> bar <span class="hljs-keyword">in</span> <span class="hljs-variable language_">this</span>)
  <span class="hljs-keyword">yield</span> <span class="hljs-literal">true</span></code></span></pre>

        </div>
    </div>

    <div class="content-left">
        <div class="code-example good">

<pre class="theme-atom-one-dark shadow-3xl text-sm relative overflow-hidden max-w-full tab-size h-full"><span class="hljs mb-0 block min-h-full overflow-hidden"><code>        <span class="hljs-keyword">let</span> foo
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> bar <span class="hljs-keyword">in</span> <span class="hljs-variable language_">this</span>)
       <span class="hljs-keyword">yield</span> <span class="hljs-literal">true</span></code></span></pre>


        </div>
    </div>
    <div class="slider"></div>

  </div>
  </div>
    </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      isDragging: false,
      lastX: 0
    };
  },
  methods: {
    hoov(event) {
      const cx = event?.touches?.[0]?.clientX || event.clientX;
      const slider = this.$el.querySelector('.slider');
      const left = this.$el.querySelector('.shown .content-left');
      const x = cx - left.getBoundingClientRect().left;
        slider.style.left = x - 1 + 'px';
        left.style.width = x + 'px';
    },
  }
}
</script>

<style scoped>
h2 {
  font-size: 1.3rem;
    font-weight: 700;
    background: var(--vp-c-default-3);
  display: inline-block;
  margin: 0 auto 5px;
  padding: 4px 12px;
}
.shown {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}
.shidden {
  visibility: hidden;
}
.shidden, .shidden .code-example {
  padding-right: 4rem;
}

.shown .content-left {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
  width: 6px;
}
.shown .content-right {

}
.content-left {
  opacity: 0.95;
  overflow: hidden;
}
.content-right {
  left: 0;
}

.slider {
  position: absolute;
  top: 0;
  left: 6px;
  height: 100%;
  width: 3px;
  background-color: #ffffff33;
}

.code-example {
    background-color: #1c2316;
    border-radius: 2px;
    color: #eee;
    height: 100%;
}
.code-example.bad {
  padding: 8px 5px 8px 25px;
  border: 1px solid #ccc;
}

.code-example.good {
  padding: 20px 0 20px 25px;
  border-radius: 18px 0 0 18px;
    background-color: #2a2442;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.bad, .bad code, .bad pre code {
    font-family: monospace !important;
  font-size: 12px;
  line-height: 23px;
  letter-spacing: 0.09em;
}

.good code {
    font-size: 14px;
}

.good .hljs-keyword {
    color: #c678dd;
}

.good .hljs-title.function_ {
    color: #61aeee;
}

.hljs-title.class_ {
    color: #e06c75;
}
.hljs-comment {
    color: #6f818c;
}

.hljs-property {
    color: #98c379;
}

.hljs-built_in {
    color: #e5c07b;
}

.hljs-string {
    color: #98c379;
}

/*bad*/
.bad .hljs-keyword {
    color: #c678dd;
}

.bad .hljs-title.function_ {
    color: #61aeee;
}

.bad .hljs-title.class_ {
    color: #e06c75;
}
.bad .hljs-comment {
    color: #6f818c;
}

.bad .hljs-property {
    color: #98c379;
}

.bad .hljs-built_in {
    color: #e5c07b;
}

.bad .hljs-string {
    color: #98c379;
}
</style>
