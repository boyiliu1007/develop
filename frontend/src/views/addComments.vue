<template>
    <form-field class="w-[70vw]" :url="url" :id="id"/>
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