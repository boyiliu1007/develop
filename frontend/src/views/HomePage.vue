<!-- done -->
<template>
  <div class="flex flex-col pt-24 ease-in-out duration-1000">
    <!--用 v-for 可以迭代-->
    <h1 class="text-3xl article-title self-center">所有文章</h1>
    <!-- <hr/> -->
    <!-- 下面的 div 加self-center 置中-->
      <div v-for="POST in posts" v-bind:key="POST.POST_ID" class="group self-center">
        <div class="wrap-collabsible ease-in-out duration-1000 ">
          <!-- <input id="collapsible" class="toggle" type="checkbox" /> -->

          <label for="collapsible" class="lbl-toggle text-center">
            <div class="card mb-3">
              <div class="card-body">
                <div class="article-desc mb-1 pt-3">
                  {{ POST.POST_ID }}
                </div>
                <h2 class="article-title">
                  {{ POST.Title }}
                </h2>
                <div class="text-sm text-slate-400 text-muted mb-2">
                  {{ POST.Author }}
                </div>
              </div>
            </div>
          </label>

          <div class="collapsible-content transition transform hidden group-hover:block cardHover group-hover: bg-white group-hover: opacity-70 ease-in-out duration-500">
            <div class="content-inner word-wrap:break-word px-10 info">
              {{ POST.Detail }}
            </div>
            <div class="control">
              <p class="btn">
                <a :href="frontEndUrl + '/post/' + POST.POST_ID">View Comments</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
  </template>
  
  
  <script>
  import axios from "axios";
  import { ref, reactive } from "vue";
  const baseUrl = "http://localhost:3000/api/";
  const frontEndUrl = "http://localhost:5173";
  export default {
    setup() {
      // 雖然是陣列，但這裡用ref因為內容不會改變
      const posts = ref([]);
      // 這裡用reactive因為內容會改變
      const showModal = reactive([100]);
      // some functions
      const toggleModal = (id) => {
        //console.log("toggle Modal", id);
        showModal[id] = !showModal[id];
      };
      const getPosts = async () => {
        const response = await axios.get(baseUrl, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        posts.value = response.data;
        console.log(response.data);
        console.log(posts.value);
      };
      getPosts();
      return { posts, showModal, toggleModal, frontEndUrl };
    },
  };
  </script>