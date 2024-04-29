<template>
  <div class = "animate__animated animate__fadeInDown">
    <form-field :url="url" :id="id"/>
  </div>
</template>

<script>
  //@ is an alias to /src
  import { useRoute } from "vue-router";
  import formField from "@/components/formField2.vue";
  export default {
    name: "HomeView",
    components: {
      formField,
    },
    setup() {
      const route = useRoute()
      // console.log(route.params.id)
      const url = "http://localhost:3000/api/post/";
      const id = route.params.id;
      return { url, id };
    },
  };
</script>