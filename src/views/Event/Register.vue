<script setup>
import { useRouter} from 'vue-router'
import { defineProps, inject } from 'vue';

const props = defineProps(['event'])

const router = useRouter()
const Gstore = inject('GStore')

const register = () => {
  Gstore.flashMessage = 'You are Successfully registered for ' + event.title
  setTimeout(()=>{
    Gstore.flashMessage = ''}, 3000)
  router.push({name: 'event-details'})
}

</script>

<template>
    <p> Register for event</p>
    <button @click="register">Register Me!</button>
</template>
