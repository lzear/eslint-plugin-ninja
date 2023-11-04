<template>

  <div class="code-examples">

    <div class="max-w-[100%]">

      <h2>
        Your code looks like this?
      </h2>

  <div class="code-example bad">
  <pre class="theme-atom-one-dark-min shadow-3xl text-sm relative overflow-hidden max-w-full tab-size h-full"><span class="hljs mb-0 p-4 block min-h-full overflow-auto"><code><span class="hljs-keyword">let</span> r=<span class="hljs-title function_">fetchData</span>(tId), d=<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(r), aB=d.<span class="hljs-property">bal</span>, tT=d.<span class="hljs-property">type</span>;
<span class="hljs-keyword">let</span> tA=<span class="hljs-built_in">parseFloat</span>(d.<span class="hljs-property">amt</span>), lD=<span class="hljs-title function_">getDate</span>(), uN=<span class="hljs-title function_">getUser</span>(), ref=<span class="hljs-title function_">genRef</span>(tId,lD);
<span class="hljs-keyword">let</span> pS=<span class="hljs-title function_">paymentStatus</span>(aB), lT=<span class="hljs-title function_">transType</span>(tT), meta=<span class="hljs-title function_">getMetadata</span>(tId);
<span class="hljs-keyword">if</span>(tT===<span class="hljs-string">"debit"</span>) { aB-=tA; } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(tT===<span class="hljs-string">"credit"</span>) { aB+=tA; }
<span class="hljs-title function_">updateHistory</span>(tId, aB, lD, ref); <span class="hljs-title function_">applyLog</span>(uN, tId, ref, lD);
<span class="hljs-title function_">checkAlerts</span>(aB, pS); <span class="hljs-title function_">notifyUserIfThreshold</span>(uN, pS, aB);
<span class="hljs-title function_">sendNotify</span>(uN, pS, tA); <span class="hljs-title function_">logAudit</span>(tId, uN, lT, ref);
<span class="hljs-title function_">handleEndOfTransaction</span>(tId, lT, pS, ref);</code></span></pre>
  </div>
    </div>


    <div class="ml-auto inline-block max-w-[100%]">

      <div class="inline-block max-w-[100%]">
      <h2>
        Make it look like this!
      </h2>
  <div class="code-example good">


    <pre class="theme-atom-one-dark-min shadow-3xl text-sm relative overflow-hidden max-w-full tab-size h-full"><span class="hljs mb-0 p-4 block min-h-full overflow-auto"><code>         <span class="hljs-keyword">import</span> 👈 <span class="hljs-keyword">from</span> <span class="hljs-string">'left-pad'</span>
         <span class="hljs-keyword">import</span> 🎭 <span class="hljs-keyword">from</span> <span class="hljs-string">'is-even'</span>

               <span class="hljs-keyword">let</span> ✋ = <span class="hljs-string">'1'</span>
            <span class="hljs-keyword">let</span> 🔥 = +👈(✋++, ✋)
       <span class="hljs-keyword">let</span> 🌈 = 🔥++ + ++✋ + +🎭(++🔥)
            <span class="hljs-keyword">let</span> 🌯 = 🌈 + 🔥 * 🖐️

<span class="hljs-comment">// 12% of the people can't solve this! 😂</span>
       <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(👈(✋, 🌯, 🌈) + <span class="hljs-number">1</span>)</code></span></pre>

  </div>
      </div>

      <div class="flex">
      <p class="italic text-xs text-center max-w-[100%]">
        Preview provided solely for illustrative purposes, should not be considered as a binding or contractual representation. Fonts not included. Please note that using emojis as variable names is not technically supported in Javascript and most programming languages. Performed by trained professionals only. Do not try this at home. Always prioritize safe coding practices.
      </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.142em;
}
p {
  flex-grow: 1;
  width: 0;
}
.code-examples {
  display: flex;
  gap: 2em;
  flex-wrap: wrap;
    max-width: 1152px;
}
.code-example {
  background-color: #1c2316;
  border-radius: 2px;
  color: #eee;
}
.code-example.bad {
    border: 1px solid #ccc;
}
.code-example.good {
  border-radius: 18px;
  background-color: #2a2442;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.bad, .bad code, .bad pre code {
  font-family: monospace !important;
  font-size: 11px;
}

.good code {
  font-size: 20px;
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

.container {
  display: flex;
  flex-direction: column;
  padding-inline: 24px;
}
</style>
<script setup lang="ts">
</script>
