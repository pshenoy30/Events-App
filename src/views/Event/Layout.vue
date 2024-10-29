<script setup>
import EventService from '@/services/EventService.js';
import { onMounted, ref} from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const event = ref(null)

const props = defineProps({
  id: {
    required: true
  },
})

onMounted(() => {
  EventService.getEvent(props.id).then((response)=>{event.value = response.data}).catch((error) => { 
    if(error.response && error.response.status == 404){
      router.push({
                    name: '404Resource',
                    params: { resource: 'event'}
                  })
    } else{
      router.push ({ name: 'NetworkError'})
    }
   
  })
})

</script>

<template>

    <div v-if="event" class="event-card"> 
        <h1>{{ event.title }}</h1>
        <div id="nav">
          <router-link :to="{name: 'event-details', params: { id: props.id }}">Details</router-link> |
          <router-link :to="{name: 'event-register', params: { id: props.id }}">Register</router-link> |
          <router-link :to="{name: 'event-edit', params: { id: props.id }}">Edit</router-link>
        </div>
        <router-view :event="event" />
    </div>
</template>
