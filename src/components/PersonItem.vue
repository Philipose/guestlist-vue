<script setup>
const props = defineProps({
  person: Object,
  party: Object,
  table: Object
})
</script>

<template>
  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 py=9">
    <td class="text-left">{{ person['First Name'] }} {{ person['Last Name'] }}</td>
    <td class="text-center">{{ person['Table'] }}</td>
    <td class="text-center">
      <button @click="console.log(party)">Expand</button>
    </td>
  </tr>
  <tr class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-slate-50 transition-all duration-500" v-if="Object.keys(party).length > 0">
    <th colspan="3" scope="col">Party Members</th>
  </tr>
  <tr v-for="member in party" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 transition-all duration-500" v-if="Object.keys(party).length > 0">
    <td class="text-left">{{ member['First Name'] }} {{ member['Last Name'] }}</td>
    <td class="text-center">{{ member['Table'] }}</td>
    <td class="text-center"></td>
  </tr>
  <th class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-slate-50 transition-all duration-500" colspan="3">Other Table Members</th>
  <tr v-for="member in table" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-b transition-all duration-500">
    <td class="text-left">{{ member['First Name'] }} {{ member['Last Name'] }}</td>
    <td class="text-center">{{ member['Table'] }}</td>
    <td class="text-center"></td>
  </tr>
</template>

<style scoped>
</style>
