<script setup>
// Simplified mock of github.com/signup (GitHub blocks automated screenshots of this page)
// step 1 = the form, step 2 = the email code screen
defineProps({ step: { type: Number, default: 1 } })
</script>

<template>
  <div class="gh">
    <div class="badge">示意圖 · github.com/signup</div>
    <template v-if="step === 1">
      <div class="title">Sign up for GitHub</div>
      <div class="sso">Continue with Google</div>
      <div class="or">or</div>
      <div class="field hot1"><label>Email*</label><div class="input">student@example.com</div></div>
      <div class="field hot2"><label>Password*</label><div class="input">••••••••••••••••</div>
        <div class="hint">Password should be at least 15 characters OR at least 8 characters including a number and a lowercase letter.</div></div>
      <div class="field hot3"><label>Username*</label><div class="input">space-pilot-0925</div>
        <div class="hint">Username may only contain alphanumeric characters or single hyphens.</div></div>
      <div class="field"><label>Your Country/Region*</label><div class="input sel">Taiwan ▾</div></div>
      <div class="btn green">Create account ›</div>
    </template>
    <template v-else>
      <div class="title">Confirm your email address</div>
      <div class="hint" style="margin-bottom:.6rem">We sent a code to <b>student@example.com</b></div>
      <div class="field hot1"><label>Enter code*</label>
        <div class="code"><span v-for="d in '12345678'" :key="d">{{ d }}</span></div></div>
      <div class="btn green">Continue ›</div>
      <div class="hint" style="margin-top:.6rem">Didn't get your email? <u>Resend the code</u></div>
    </template>
  </div>
</template>

<style scoped>
.gh { position: relative; background: #fff; color: #1f2328; font-family: -apple-system, 'Segoe UI', 'Noto Sans TC', sans-serif; font-size: .85rem; border: 4px solid #fff; box-shadow: 8px 8px 0 #000; padding: 1rem 1.4rem 1rem; line-height: 1.35; }
.badge { position: absolute; top: -.9rem; right: .6rem; background: var(--yellow); color: #000; font-weight: 900; font-size: .8rem; padding: .15rem .5rem; box-shadow: 3px 3px 0 #000; }
.title { font-size: 1.3rem; font-weight: 600; margin-bottom: .5rem; }
.sso { border: 1px solid #d0d7de; border-radius: 6px; text-align: center; padding: .25rem; font-weight: 600; }
.or { text-align: center; color: #59636e; font-size: .75rem; margin: .2rem 0; }
.field { margin: .55rem 0; border-radius: 6px; }
label { font-weight: 600; display: block; }
.input { border: 1px solid #d0d7de; border-radius: 6px; padding: .2rem .5rem; font-family: ui-monospace, Consolas, monospace; }
.hint { font-size: .7rem; color: #59636e; margin-top: .1rem; }
.btn { display: block; text-align: center; border-radius: 6px; padding: .3rem; font-weight: 600; margin-top: .6rem; }
.btn.green { background: #1f883d; color: #fff; }
.code { display: flex; gap: .3rem; }
.code span { width: 1.8rem; height: 2.2rem; border: 1px solid #d0d7de; border-radius: 6px; display: grid; place-items: center; font-size: 1.1rem; font-weight: 600; }
.hot1, .hot2, .hot3 { outline: 4px solid var(--pink); outline-offset: 3px; }
.hot2 { outline-color: var(--neon); } .hot3 { outline-color: var(--yellow); }
</style>
