<!-- done -->
<template>
  <nav class="fixed w-full h-auto flex flex-row justify-between">

    <div class="left-col w-1/8">
      <router-link to="/">
        <h1 class=" pr-4 pl-4 font-semibold m-4 buttonHover">Boyi's Blog</h1>
      </router-link>
    </div>

    
    <div class="right-col w-3/4 flex flex-row flex-nowrap justify-end">
      
      <h1 class="m-4"> {{ greeting_msg }} </h1>

      <router-link to="/new" class="m-4 buttonHover">
        <span>新文章</span>
      </router-link>

      <router-link to="/user" v-if = "log_status" class="m-4 buttonHover">
        <span>我的文章</span>
      </router-link>

      <router-link to="/auth" class="m-4 buttonHover">
        <!-- 使用 button 時注意要多加 type="button"，否則他有預設的功能，會使頁面強制刷新(使用者體驗問題) -->
        <!-- @click 可以指定按鈕按下時要觸發的函式 -->
        <button type="button" @click="loginout"> {{ log_Button }}</button>
      </router-link>
      
    </div>
  </nav>
  <router-view />
</template>

<script>
//import modules
import { ref, onMounted } from "vue";
import Cookies  from "js-cookie";
export default {
  setup() {
    // 變數設置 (初始化)
    const greeting_msg = ref("");
    const log_Button = ref("");
    // 登入狀態，若有登入會顯示管理文章的按鈕
    const log_status = ref(false);
    // 負責登入登出切換的函式，此處僅宣告，需要呼叫才會執行！
    const loginout = () => {
      // 如果有 jwt 代表已經登入，當函式被呼叫時就登出
      // 
        if (Cookies.get("jwt")) {
          // 刪除 jwt 與 username
          
          Cookies.remove("jwt");
          Cookies.remove("username");
          greeting_msg.value = "你好";
          log_Button.value = "登入";
          log_status.value = false;
          
        } 
      // }
    };
    onMounted(() => {
      // 頁面構建完成後，判斷是否有 jwt，有的話就是登入狀態，並依據狀態設定按鈕文字
      console.log(Cookies.get("jwt"));
      if (Cookies.get("jwt")) {
        greeting_msg.value = "歡迎回來，" + Cookies.get("username");
        log_Button.value = "登出";
        log_status.value = true;
      } else {
        greeting_msg.value = "你好";
        log_Button.value = "登入";
        log_status.value = false;
      }
    });
    // 回傳變數，DOM 才能使用
    return { greeting_msg, log_Button, loginout, log_status };
  },
};
</script>
