<script setup>

import { ref, computed } from 'vue'
import PersonItem from './components/PersonItem.vue';
import weddingData from './assets/wedding.json'

const weddingList = ref(weddingData)
const search = ref('')
let debounceTimer;
let searchTimer;

const searchList = computed(() => {
  if(search.value.length < 3) {
    return
  }
  return weddingList.value.filter(person => (person['First Name']+ ' ' + person['Last Name']).toLowerCase().includes(search.value.toLowerCase()))
})


function getPartyMembers(party, person) {
  return weddingData.filter(partyMember => {
    return party == partyMember['Party'] && (person['First Name']+person['Last Name'] !== partyMember['First Name']+partyMember['Last Name'])
  })
}

function getTableMembers(table, person) {
  return weddingData.filter(tableMember => {
    return table == tableMember['Table'] && (person['First Name']+person['Last Name'] !== tableMember['First Name']+tableMember['Last Name'] && person["Party"] !== tableMember["Party"])
  })
}

const handleSearchChange = () => {
  clearTimeout(debounceTimer);
  clearTimeout(searchTimer);
  
  // Debounce the search initiation
  debounceTimer = setTimeout(() => {
    // Only start the search if the input value has changed during the debounce period
    if (search.value !== searchInput) {
      return;
    }

    // Initiate the search after the debounce time and an additional delay
    searchTimer = setTimeout(() => {
      console.log('Perform search:', search.value);
    }, 1000); // Additional delay before starting the search
  }, 1000); // Debounce time for typing delay
}

let searchInput = '';
const handleInput = () => {
  searchInput = search.value;
  handleSearchChange();
}
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" /> -->
    <div class="max-w-4xl mx-auto py-5">
      <input v-model="search" @input="handleInput" class="w-full flex justify-center mb-4">
      <div class="wrapper mb-4">
        <div class="p-2 border">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">Name</th>
                <th scope="col" class="px-6 py-3">Table</th>
                <th scope="col" class="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <PersonItem
                @input="handleInput" v-for="person in searchList"
                :person="person"
                :party="getPartyMembers(person['Party'], person)"
                :table="getTableMembers(person['Table'], person)"
              >
              </PersonItem>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </header>

</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
