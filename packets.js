const faker = require('faker');

function generatePacket(destIP = 'c0a8017e', payload = 'c8511c') {
  const ipLength = faker.datatype.number({ min: 30, max: 60 });
  const ipTTL = faker.datatype.number({ min: 30, max: 60 });
  const sourcePort = faker.datatype.number({ min: 3000, max: 4200 }).toString(16).padStart(4, '0');
  const destPort = faker.datatype.number({ min: 3000, max: 4200 }).toString(16).padStart(4, '0');

  // prettier-ignore
  return ['88e9fe877f08',  '101331b7943a', '0800', '450000', String(ipLength), '00004000', String(ipTTL), '11ec5d', 'd83ace2e', destIP, sourcePort, destPort, '00243988', payload]
}

function generateTeamPackets() {
  const teams = [
    { colors: ['#9da99a', '#271e1d', '#605323', '#433b32', '#000000'], ip: '1f0d5624' },
    { colors: ['#ccc484', '#afa194', '#c1a79a', '#2e3032', '#565650'], ip: '5d397b11' },
    { colors: ['#e7cec0', '#8a7a70', '#c7c4a1', '#656155', '#444648'], ip: '8efab44a' },
    { colors: ['#8e9388', '#4d4520', '#edd826', '#eae3a8', '#f3e4c9'], ip: 'acd9154e' },
    { colors: ['#726b0c', '#352d1c', '#babab8', '#72777a', '#ffffff'], ip: 'd83ace44' },
  ];

  const packets = teams
    .map(({ colors, ip }) =>
      colors.map((color, i) => {
        return generatePacket(ip, `${i.toString(16).padStart(2, '0')}${color}`).join('');
      }),
    )
    .flat();

  console.log(faker.helpers.shuffle(packets));
}

generateTeamPackets();

function generateQRPackets() {
  const bitmap = [
    '11111110011010000100101101111111',
    '10000010001001100011101001000001',
    '10111010011111001111011001011101',
    '10111010000000101011011001011101',
    '10111010111001011001001001011101',
    '10000010000110100011100101000001',
    '11111110101010100101010101111111',
    '00000000111000100101011000000000',
    '00110011110111110010100111010000',
    '00100100011111110100000011001101',
    '01111111100011010011111111001011',
    '10011000010110100010110010111000',
    '10001010011000001101111110101101',
    '10000001011111001110100110111000',
    '11010111100101000111100000001100',
    '10001001001000010011111000011100',
    '01010000111100011101011001010111',
    '11100010010001000011110000010110',
    '11011101010001111101010011100001',
    '00111011011111011100110010101111',
    '11111000101101111000100010001001',
    '00100111010001101111110001100111',
    '01101000110011100010001110111001',
    '10010010001110010011111111111011',
    '00000000111000001001010100011010',
    '11111110111111001101011101011000',
    '10000010001010111110110100011111',
    '10111010010111010011001111110110',
    '10111010101000000010101100100000',
    '10111010111100000010001111001100',
    '10000010011111011000011111001001',
    '11111110000000100010100000110000',
  ];

  const packets = bitmap.map((row, i) => {
    return generatePacket('c0a8017e', `${i.toString(16).padStart(2, '0')}${row}`).join('');
  });

  console.log(faker.helpers.shuffle(packets));
}

// generateQRPackets();
