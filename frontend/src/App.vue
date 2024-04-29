<!-- done -->
<template>
  <nav class="fixed w-full flex flex-row justify-between items-center">
    <div class="left-col w-1/8">
      <router-link to="/">
        <h1 class="font-semibold m-4 buttonHover">Boyi's Blog</h1>
      </router-link>
    </div>

    <div class="right-col w-3/4 flex flex-row flex-nowrap justify-end">
      <button class="m-4 buttonHover" @click = "navToggleButton">{{ greeting_msg }}</button>
      <div v-if = "menuVisible">
        <div class = "nav_container">
          <div v-if='log_Button == "登出"'>
            <div v-for = "option in list2">
              <router-link :to= "option.route">
                <span>{{option.name}}</span>
              </router-link>
            </div>
          </div>
          <div v-else>
            <div v-for = "option in list1">
              <router-link :to= "option.route">
                <span>{{option.name}}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <router-link to="/new" class="m-4 buttonHover">
        <span>新文章</span>
      </router-link>

      <router-link to="/user" v-if = "log_status" class="m-4 buttonHover">
        <span>我的文章</span>
      </router-link>

      <router-link to="/auth" class="m-4 buttonHover">
        <button type="button" @click="loginout"> {{ log_Button }}</button>
      </router-link>
    </div>
  </nav>
  <router-view />
</template>

<script>
//import modules
import { ref, onMounted, isReactive } from "vue";
import Cookies  from "js-cookie";
export default {
  setup() {
    const containerLeft = ref('');
    const menuVisible = ref(false);
    const navToggleButton = () => {
      menuVisible.value = !menuVisible.value;
      console.log(menuVisible);
    };
    const list1 = ref([
      {name: "HOME", route: "/"}, 
      {name: "LOG IN", route: "/auth"}
    ]);
    
    const list2 = ref([
      {name: "HOME", route: "/"},
      {name: "NEW POST", route: "/new"}, 
      {name: "MY POST", route: "/user"},
      {name: "LOG IN", route: "/auth"}
    ]);
    
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
    return { greeting_msg, log_Button, loginout, log_status, navToggleButton, menuVisible, list1, list2};
  },
};
</script>
