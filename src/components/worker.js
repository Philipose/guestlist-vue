// worker.jsself.onmessage = function(event) {
console.log('Worker: Components Message received from main script');
self.onmessage = function(event) {
    const { party, table } = event.data;
    const partyMembers = Object.values(party);
    const tableMembers = Object.values(table);
  
    // Construct the HTML for party members
    const partyHTML = partyMembers.map(member => {
      return `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 transition-all duration-500">
                <td class="text-left">${member['First Name']} ${member['Last Name']}</td>
                <td class="text-center">${member['Table']}</td>
                <td class="text-center"></td>
              </tr>`;
    }).join('');
  
    // Construct the HTML for other table members
    const tableHTML = tableMembers.map(member => {
      return `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-b transition-all duration-500">
                <td class="text-left">${member['First Name']} ${member['Last Name']}</td>
                <td class="text-center">${member['Table']}</td>
                <td class="text-center"></td>
              </tr>`;
    }).join('');
  
    // Send back the constructed HTML to the main thread
    console.log("Worker Results\n",partyHTML, tableHTML);
    // self.postMessage({ "<tr><td>test-P</td></tr>", "<tr><td>test-T</td></tr>" });
    self.postMessage({ partyHTML, tableHTML });
  }; 
  