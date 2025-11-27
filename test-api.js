// Quick API Test Script
// Run with: node test-api.js

async function testAPI() {
  console.log('🧪 Testing API Endpoints...\n');

  // Test TVL API
  console.log('📊 Testing TVL API...');
  try {
    const tvlResponse = await fetch(
      'https://identity.api.prod.metalx.com/v1/loan/stats/tvl?token_symbol=XUSDC&days=7'
    );
    
    if (!tvlResponse.ok) {
      console.error('❌ TVL API Error:', tvlResponse.status, tvlResponse.statusText);
    } else {
      const tvlData = await tvlResponse.json();
      console.log('✅ TVL API Response Structure:');
      console.log('Keys:', Object.keys(tvlData));
      console.log('\nSample Data Point:');
      if (tvlData.chartData && tvlData.chartData[0]) {
        console.log(JSON.stringify(tvlData.chartData[0], null, 2));
      }
      console.log('\nFull Response (first 500 chars):');
      console.log(JSON.stringify(tvlData, null, 2).substring(0, 500));
    }
  } catch (error) {
    console.error('❌ TVL API Error:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test APY API
  console.log('📈 Testing APY API...');
  try {
    const apyResponse = await fetch(
      'https://identity.api.prod.metalx.com/v1/loan/stats/apy?token_symbol=XUSDC&days=7'
    );
    
    if (!apyResponse.ok) {
      console.error('❌ APY API Error:', apyResponse.status, apyResponse.statusText);
    } else {
      const apyData = await apyResponse.json();
      console.log('✅ APY API Response Structure:');
      console.log('Keys:', Object.keys(apyData));
      console.log('\nSample Data Point:');
      if (apyData.chartData && apyData.chartData[0]) {
        console.log(JSON.stringify(apyData.chartData[0], null, 2));
      }
      console.log('\nFull Response (first 500 chars):');
      console.log(JSON.stringify(apyData, null, 2).substring(0, 500));
    }
  } catch (error) {
    console.error('❌ APY API Error:', error.message);
  }
}

testAPI();



