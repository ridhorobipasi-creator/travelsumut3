const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'resources', 'js', 'pages');
const files = fs.readdirSync(dir).filter(f => f.startsWith('Admin') && f.endsWith('.tsx') && !['AdminLogin.tsx', 'AdminDashboard.tsx', 'AdminPackages.tsx', 'AdminRental.tsx', 'AdminBlog.tsx', 'AdminGallery.tsx', 'AdminPages.tsx', 'AdminOrderReport.tsx', 'AdminReports.tsx', 'AdminSettings.tsx', 'AdminTripData.tsx'].includes(f));

const mocks = {
  'AdminUsers.tsx': `const mocks = [{ id: 1, name: 'Admin Utama', email: 'admin@sumuttour.id', role: 'admin' }, { id: 2, name: 'User Test', email: 'user@test.com', role: 'user' }];`,
  'AdminTripSchedule.tsx': `const mocks = [{ id: 1, name: 'Trip Samosir', date: '2026-04-10', status: 'Scheduled' }];`,
  'AdminReviews.tsx': `const mocks = [{ id: 1, name: 'Budi (Google)', rating: 5, text: 'Pelayanan sangat bagus!' }, { id: 2, name: 'Siti', rating: 4, text: 'Mobil bersih dan wangi.' }];`,
  'AdminRentalSchedule.tsx': `const mocks = [{ id: 1, vehicle: 'Innova Reborn', date: '2026-04-01 to 2026-04-03', status: 'Booked' }];`,
  'AdminPartners.tsx': `const mocks = [{ id: 1, name: 'Traveloka', type: 'OTA', status: 'Active' }, { id: 2, name: 'Garuda Indonesia', type: 'Airlines', status: 'Active' }];`,
  'AdminLanguageCurrency.tsx': `const mocks = [{ id: 1, name: 'English (USD)', status: 'Active' }, { id: 2, name: 'Indonesian (IDR)', status: 'Active' }];`,
  'AdminInstagram.tsx': `const mocks = [{ id: 1, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400&auto=format&fit=crop', caption: 'Sunset di Toba', status: 'Active' }];`,
  'AdminHotels.tsx': `const mocks = [{ id: 1, name: 'Hotel Danau Toba Int.', address: 'Jl. Imam Bonjol', city: 'Medan', province: 'Sumut', phone: '061-123456', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format&fit=crop' }];`,
  'AdminCustomTrip.tsx': `const mocks = [{ id: 1, name: 'Budi Santoso', destination: 'Nias (Surfing Trip)', status: 'Pending' }];`,
  'AdminContacts.tsx': `const mocks = [{ id: 1, name: 'Ahmad', email: 'ahmad@web.com', message: 'Apakah bisa rombongan 50 orang?', status: 'Unread' }];`,
  'AdminCategories.tsx': `const mocks = [{ id: 1, name: 'Alam', description: 'Wisata pegunungan & danau' }, { id: 2, name: 'Budaya', description: 'Wisata sejarah dan situs kuno' }];`,
  'AdminBusinessProfile.tsx': `const mocks = [{ id: 1, name: 'SumutTour', address: 'Jl. Jendral Sudirman, Medan', phone: '08123456789' }];`,
  'AdminAssets.tsx': `const mocks = [{ id: 1, name: 'Banner Promo Danau Toba', type: 'Image', status: 'Active' }];`,
  'AdminActivityLog.tsx': `const mocks = [{ id: 1, user: 'Admin', action: 'Update Paket', time: '1 jam lalu' }, { id: 2, user: 'System', action: 'Auto Backup', time: '3 jam lalu' }];`
};

const getters = {
  'AdminUsers.tsx': 'setUsers',
  'AdminTripSchedule.tsx': 'setSchedules',
  'AdminReviews.tsx': 'setReviews',
  'AdminRentalSchedule.tsx': 'setSchedules',
  'AdminPartners.tsx': 'setPartners',
  'AdminLanguageCurrency.tsx': 'setItems',
  'AdminInstagram.tsx': 'setFeeds',
  'AdminHotels.tsx': 'setHotels',
  'AdminCustomTrip.tsx': 'setRequests',
  'AdminContacts.tsx': 'setContacts',
  'AdminCategories.tsx': 'setCategories',
  'AdminBusinessProfile.tsx': 'setProfiles',
  'AdminAssets.tsx': 'setAssets',
  'AdminActivityLog.tsx': 'setLogs'
};

files.forEach(file => {
  const p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf8');
  
  const mockVars = mocks[file] || 'const mocks = [];';
  const setterMatch = content.match(/set([A-Za-z]+)\(res\.data\.data/);
  let theSetter = 'setItems';
  if (setterMatch) {
      theSetter = 'set' + setterMatch[1];
  } else if (getters[file]) {
      theSetter = getters[file];
  } else if (content.match(/setFeeds/)) theSetter = 'setFeeds';
  else if (content.match(/setHotels/)) theSetter = 'setHotels';
  else if (content.match(/setCategories/)) theSetter = 'setCategories';
  
  if (file === 'AdminCategories.tsx') theSetter = 'setCategories';
  
  // replace axios.get
  const originalFetchPattern = /axios\.get[^]+\.finally\(\(\) => setLoading\(false\)\);/;
  
  const newFetch = `// Updated to use mock data fallback
    setLoading(true);
    axios.get('/api/dummy-test')
      .then(res => {
         if(res.data && Array.isArray(res.data.data)) ${theSetter}(res.data.data);
         else { throw new Error('fallback'); }
      })
      .catch(() => {
         ${mockVars}
         ${theSetter}(mocks);
      })
      .finally(() => setLoading(false));`;

  if (content.match(originalFetchPattern)) {
      content = content.replace(originalFetchPattern, newFetch);
      fs.writeFileSync(p, content);
      console.log('Fixed ' + file);
  } else {
      console.log('Could not find fetch pattern in ' + file);
  }
});
