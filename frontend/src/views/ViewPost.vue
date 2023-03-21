<!-- not done yet -->
<template>
  <div class = "animate__animated animate__fadeInLeft">
    <div class = "pt-24">
      <div class="card sticky hyphens">
        <h1 class="article-title">{{ post.Title }}</h1>
        <p class="text-sm text-slate-400 mb-2">by {{ post.Author }}</p>
        <hr />
        <p>{{ post.Detail }}</p>
      </div>
    </div>
    <div class="overflow-y-scroll m-4 p-10">
      
      <div class = "flex flex-row ">
        <h1 class="article-title w-4/5 justify-start pr-10" >Comments</h1>
        <div class = " justify-end">
          <div class = "w-auto self-center pl-3">
            <button class="btnWhite" @click="link">new</button>
          </div>
        </div>
      </div>


      <div v-if="showWarning">
        <p class="card w-full text-red-600 article-title">{{ Warning_msg }}</p>
      </div>
      <div v-if="!showWarning">
        <div class="card" v-for="comment in comments" :key="comment.COMMENT_ID">
          <p>{{ comment.Field }}</p>
        </div>
      </div>
    </div>
  </div>
  </template>

<script>
  import axios from "axios";
  import { ref } from "vue";
  import Cookies from "js-cookie";
  import { useRoute } from "vue-router";
  import { useRouter } from 'vue-router';
  const baseUrl = "http://localhost:3000/api/post/";
  export default {
    setup() {
      const route = useRoute();
      const router = useRouter();
      const showWarning = ref(false);
      const Warning_msg = ref("");
      let reqUrl = baseUrl + route.params.id;
      const post = ref({});
      const comments = ref({});
      const getPost = async () => {
        try {
          const res = await axios.get(reqUrl);
          post.value = res.data[0];
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      const getComment = async () => {
        try {
          const res = await axios.get(reqUrl + "/comments",{
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (res.status === 200){
            comments.value = res.data;
          } else {
            comments.value = [];
            showWarning.value = true;
            Warning_msg.value = "No comments yet";
          }
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getPost();
      getComment();

      const link =() =>{
        if(Cookies.get("jwt")){
          router.push(route.params.id + "/addcomments");
        }
        else{
          router.push("/notLogin");
        }
      }
      return { post, comments, showWarning, Warning_msg, link};
    }
  }
</script>
  