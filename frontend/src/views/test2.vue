<template>
  <div class="flex flex-col pt-24 ease-in-out duration-1000">
    <!--用 v-for 可以迭代-->
    <h1 class="text-3xl article-title self-center">我的文章</h1>

    <br/>
    <br/>
    <router-link to="/new" class = "w-auto self-center pr-0">
      <button class="btnWhite">new</button>
    </router-link>

    <div v-for="post in posts" v-bind:key="post.POST_ID" class="group">
      <div v-if = "post.Author === mypost">
        <div class="wrap-collabsible">
          <input id="collapsible" class="toggle" type="checkbox" />
          <label for="collapsible" class="lbl-toggle text-center">
            <div class="card mb-0">
              <div class="card-body">
                <h2 class="article-title mb-2">
                  {{ post.Title }}
                </h2>
                <div class="text-sm text-slate-400 text-muted mb-2">
                  {{ post.Author }}
                </div>
                <div class="article-desc mb-2 word-wrap:break-word">
                  {{ post.Detail }}
                </div>
              </div>
            </div>
          </label>
          <div
            class="collapsible-content transition transform hidden group-hover:block"
          >
            <div class="content-inner">
              <p v-html="post.sanitizedHtml"></p>
            </div>
            
            <div class="control">
              <button
                class="btn btn-primary"
                type="button"
                v-on:click="toggleModal(post.POST_ID)"
              >
                Edit
              </button>
              <form
                :action="
                  'http://localhost:5555/articles/' + post._id + '?_method=DELETE'
                "
                method="POST"
                class="d-inline"
              >
                <button type="button" class="btn btn-danger" @click="dp(post.POST_ID)">
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
        <div
          v-show="showModal[post.POST_ID]"
          class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
        >
          <div class="relative w-auto my-6 mx-auto max-w-6xl">
            <!--content-->
            <div
              class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
            >
              <!--header-->
              <div
                class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t"
              >
                <form
                  :action="
                    'http://localhost:5555/articles/' + post.POST_ID + '?_method=PUT'
                  "
                  method="POST"
                >
                  <div class="form-group flex flex-row w-full m-4 z-0">
                    <div class="w-1/5 border-0 border-blue">
                      <label for="title">Title</label>
                    </div>
                    <div class="w-4/5">
                      <input
                        required
                        :value="post.Title"
                        type="text"
                        name="title"
                        id="title"
                        class="form-control w-11/12"
                      />
                    </div>
                  </div>

                  <!--body-->
                  <div class="relative p-6 flex-auto">
                    <div class="my-4 text-slate-500 text-lg leading-relaxed">
                      <textarea
                        class="form-control"
                        v-model="post.Detail"
                        rows="4"
                        cols = "20"
                        id="description"
                        name="description"
                      ></textarea>
                    </div>
                  
                  </div>
                  <!--footer-->
                  <div
                    class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b"
                  >
                    <button
                      class="btn"
                      type="button"
                      v-on:click="toggleModal(post.POST_ID)"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br/>
    <!-- 有空再改吧 -->
    <div v-if = "ispost" class = "fontSize_NoPost text-center">
        <div v-once>
          
          <h1>No post yet?</h1>
          <h1>Create a new one! </h1>
          
        </div>  
    </div>
    <br/>
  </div>
</template>
<script>
import axios from "axios";
import Cookies from "js-cookie";
import sanitizeHtml from 'sanitize-html'
import { ref, reactive } from "vue";
const baseUrl = "http://localhost:3000/api/";
const frontEndUrl = "http://localhost:5173";

export default {
  setup() {
    var mypost = ref("");
    
    // 雖然是陣列，但這裡用ref因為內容不會改變
    const posts = ref([]);
    // 這裡用reactive因為內容會改變
    const showModal = reactive([100]);
    // some functions

    const toggleModal = (id) => {
      // console.log("toggle Modal", id);
      showModal[id] = !showModal[id];
      // console.log("toggle Modal", showModal[id]);
    };

    const dp = async (id) => {
      const res = await axios.delete(baseUrl + "post/" + id, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + Cookies.get("jwt"),
        },
      });
      if (res != 201) {
        alert(res.data.message);
      } else {
        alert("刪除成功");
        //reload page
        //window.location.href("http://localhost:5147/");
      }
      location.reload();
    };
    
    const getPosts = async () => {
      const response = await axios.get(baseUrl, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + Cookies.get("jwt"),
        },
      });
      posts.value = response.data;
      
      // console.log(posts.value);
      // console.log(mypost.value);
      mypost.value = Cookies.get("username");
    };

    const updatePost = () => {
      axios.put(`http://localhost:5555/articles/${props.postId}`, post.value)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    };
    
    getPosts();
    
    return { posts, showModal, toggleModal, frontEndUrl, dp, mypost};
  },
};
</script>