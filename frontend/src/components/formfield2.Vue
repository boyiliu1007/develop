<template>
    <form>
      <div class="subcontainer flex flex-col self-center align-center">
        <div class="form-group flex flex-row w-full m-4">
          <div class="w-1/5 border-0 border-blue">
            <label for="detail">Comments</label>
          </div>
          <div class="w-4/5">
            <textarea
              v-model="detail"
              name="detail"
              id="detail"
              class="form-control w-11/12 h-28"
            ></textarea>
          </div>
        </div>
        <div class="control">
          <a href="/" class="btn btn-secondary">Cancel</a>
          <button type="button" class="btn btn-primary" @click="post">
            Save
          </button>
        </div>
      </div>
    </form>
  </template>

  <script>
  import axios from "axios";
  import { ref } from "vue";
  import Cookies from "js-cookie";
  import { useRouter } from 'vue-router';
  export default {
    props: {
      url: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      }
    },
    setup(props) {
      const router = useRouter();
      const detail = ref("");
      let url = props.url;
      let id = props.id;
      //use props to set url to post
      const post = async () => {
        try {
          if(Cookies.get("jwt")){
            const res = await axios.post(
              url + id + "/addcomments",
              {
                detail: detail.value,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  authorization: "Bearer " + Cookies.get("jwt"),
                },
              }
            );
            console.log(res.data);
            alert("新增成功")
            }
          else{
            alert("請登入")
          }
        } catch (error) {
          console.log(error);
        }
        
        router.push('/');
      };
      return { detail, post };
    },
  };
  </script>