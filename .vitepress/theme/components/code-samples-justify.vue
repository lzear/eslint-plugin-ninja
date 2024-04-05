<template>
    <div class="inline-flex flex-col justify-center items-center max-w-[100%]">

        <h2 class="text-center">
            <code>justify</code>
        </h2>
        <h4>
            make your code understandable
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

<pre class="theme-atom-one-dark shadow-3xl text-sm relative overflow-visible max-w-full tab-size h-full"><span class="hljs mb-0 block min-h-full"><code><span class="hljs-comment">// for i from 1 to 101 (excluded)</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-number">101</span>; i++) {
    <span class="hljs-comment">// if divisible by 15, print FizzFizz</span>
    <span class="hljs-keyword">if</span> (i % <span class="hljs-number">15</span> == <span class="hljs-number">0</span>) <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"FizzBuzz"</span>);
    <span class="hljs-comment">// else, if divisible by 3, print Fizz</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (i % <span class="hljs-number">3</span> == <span class="hljs-number">0</span>) <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"Fizz"</span>);
    <span class="hljs-comment">// else, if divisible by 5, print Buzz</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (i % <span class="hljs-number">5</span> == <span class="hljs-number">0</span>) <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"Buzz"</span>);
    <span class="hljs-comment">// else, print the number i</span>
    <span class="hljs-keyword">else</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(i);
<span class="hljs-comment">// end of for loop</span>
}</code></span></pre>

              </div>
          </div>
      </div>
      <div class="shown">
    <div class="content-right">
        <div class="code-example bad">

<pre class="theme-atom-one-dark shadow-3xl text-sm relative overflow-hidden max-w-full tab-size h-full"><span class="hljs mb-0 block min-h-full overflow-hidden"><code><span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-number">101</span>; i++) {

    <span class="hljs-keyword">if</span> (i % <span class="hljs-number">15</span> == <span class="hljs-number">0</span>) <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"FizzBuzz"</span>);

    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (i % <span class="hljs-number">3</span> == <span class="hljs-number">0</span>) <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"Fizz"</span>);

    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (i % <span class="hljs-number">5</span> == <span class="hljs-number">0</span>) <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"Buzz"</span>);

    <span class="hljs-keyword">else</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(i);

}</code></span></pre>

        </div>
    </div>

    <div class="content-left">
        <div class="code-example good">

<pre class="theme-atom-one-dark shadow-3xl text-sm relative overflow-hidden max-w-full tab-size h-full"><span class="hljs mb-0 block min-h-full overflow-hidden"><code><span class="hljs-comment">// for i from 1 to 101 (excluded)</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-number">101</span>; i++) {
    <span class="hljs-comment">// if divisible by 15, print FizzFizz</span>
    <span class="hljs-keyword">if</span> (i % <span class="hljs-number">15</span> == <span class="hljs-number">0</span>) <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"FizzBuzz"</span>);
    <span class="hljs-comment">// else, if divisible by 3, print Fizz</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (i % <span class="hljs-number">3</span> == <span class="hljs-number">0</span>) <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"Fizz"</span>);
    <span class="hljs-comment">// else, if divisible by 5, print Buzz</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (i % <span class="hljs-number">5</span> == <span class="hljs-number">0</span>) <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"Buzz"</span>);
    <span class="hljs-comment">// else, print the number i</span>
    <span class="hljs-keyword">else</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(i);
<span class="hljs-comment">// end of for loop</span>
}</code></span></pre>

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
  display: inline-block;
  padding: 4px 12px;
  margin: 0 auto 5px;
  font-size: 1.3rem;
    font-weight: 700;
    background: var(--vp-c-default-3);
}

.shown {
    position: absolute;
    inset-block: 0 0;
    inset-inline: 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.shidden {
  visibility: hidden;
}

.shidden, .shidden .code-example {
  padding-inline-end: 4rem;
}

.shown .content-left {
    position: absolute;
    inset-block: 0 0;
    inset-inline-start: 0;
  inline-size: 6px;
}

.shown .content-right {

}

.content-left {
  overflow: hidden;
  opacity: 95%;
}

.content-right {
  inset-inline-start: 0;
}

.slider {
  position: absolute;
  inset-block-start: 0;
  inset-inline-start: 6px;
  inline-size: 3px;
  block-size: 100%;
  background-color: #ffffff33;
}

.code-example {
    block-size: 100%;
    color: #eee;
    background-color: #1c2316;
    border-radius: 2px;
}

.code-example.bad {
  padding: 8px 5px 8px 25px;
  border: 1px solid #ccc;
}

.code-example.good {
  padding: 20px 0 20px 25px;
    background-color: #2a2442;
  border-radius: 18px 0 0 18px;
    box-shadow: 0 4px 6px rgb(0 0 0 / 10%), 0 1px 3px rgb(0 0 0 / 8%);
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

/* bad */
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
