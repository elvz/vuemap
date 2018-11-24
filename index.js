new Vue({
  el: '#app',
  data: {
    map: null,
    tileLayer: null,
    layers: [
          {
            id: 0,
            name: 'Всі коворкінги',
            active: false,
            features: [
          {
            id: 0,
            name: "<b>HUB24</b><br>Независимо от того, ищете ли вы рабочее место на полный рабочий день или просто проездом в Киеве, у нас есть предложение для всех<br><a href=" + "https://hub24.com.ua" + ">HUB24</a>",
            type: 'marker',
            coords: [50.513142, 30.494154],
          },
          {
            id: 1,
            name: "<b>Blockchain Hub Kyiv</b><br>BlockchainHub.one - первый и единственный специализированый Хаб в Украине, который призван сыграть ключевую роль в создании инновационных проектов и идей, основанных на технологии Blockchain и эко-системе криптовалют.<br><a href=" + "https://blockchainhub.one/" + ">Blockchain Hub Kyiv</a>",
            type: 'marker',
            coords: [50.463758, 30.509359],
          },
          {
            id: 2,
            name: "<b>Coworking Platforma Leonardo</b><br>Создаем условия для того, чтобы вы ценили свою жизнь: работая, отдыхая, общаясь. В режиме 24/7. Иногда и выходим за пределы графика.<br><a href=" + "http://www.coworkingplatforma.com/leonardo/" + ">Coworking Platforma Leonardo</a>",
            type: 'marker',
            coords: [50.445600, 30.512755],
          },
          {
            id: 3,
            name: "<b>ЦЕХ</b><br>Это развивающаяся международная сеть рабочих пространств с высоким уровнем сервиса и комфорта, которая представлена в городах Украины и Великобритании<br><a href=" + "http://tceh.com.ua/" + ">ЦЕХ</a>",
            type: 'marker',
            coords: [50.459183, 30.489615],
          },
          {
            id: 4,
            name: "<b>SKY HUB 119</b><br>SKYHUB 119 - это пространство для быстрого и комфортного развития вашего бизнеса, которое находится в непосредственной близости от станции метро Демеевская, центрального автовокзала и других остановок общественного транспорта.<br><a href=" + "https://skyhub.com.ua" + ">SKY HUB 119</a>",
            type: 'marker',
            coords: [50.407568, 30.514255],
          },
          {
            id: 5,
            name: "<b>BAZIS Coworking</b><br>Ваш комфорт - наш приоритет. Уютное рабочее место в центре города.<br><a href=" + "https://www.bazis.org.ua" + ">BAZIS Coworking</a>",
            type: 'marker',
            coords: [50.456405, 30.503080],
          },
        ],
      },
      {
        id: 1,
        name: 'Відкриті цілодобово',
        active: false,
        features: [
          {
            id: 6,
            name: "<b>HUB24</b><br>Независимо от того, ищете ли вы рабочее место на полный рабочий день или просто проездом в Киеве, у нас есть предложение для всех<br><a href=" + "https://hub24.com.ua" + ">HUB24</a>",
            type: 'marker',
            coords: [50.513142, 30.494154],
          },
          {
            id: 7,
            name: "<b>Coworking Platforma Leonardo</b><br>Создаем условия для того, чтобы вы ценили свою жизнь: работая, отдыхая, общаясь. В режиме 24/7. Иногда и выходим за пределы графика.<br><a href=" + "http://www.coworkingplatforma.com/leonardo/" + ">Coworking Platforma Leonardo</a>",
            type: 'marker',
            coords: [50.445600, 30.512755],
          },
          {
            id: 7,
            name: "<b>BAZIS Coworking</b><br>Ваш комфорт - наш приоритет. Уютное рабочее место в центре города.<br><a href=" + "https://www.bazis.org.ua" + ">BAZIS Coworking</a>",
            type: 'marker',
            coords: [50.456405, 30.503080],
          },
          {
            id: 8,
            name: "<b>ЦЕХ</b><br>Это развивающаяся международная сеть рабочих пространств с высоким уровнем сервиса и комфорта, которая представлена в городах Украины и Великобритании<br><a href=" + "http://tceh.com.ua/" + ">ЦЕХ</a>",
            type: 'marker',
            coords: [50.459183, 30.489615],
          },
          {
            id: 9,
            name: "<b>SKY HUB 119</b><br>SKYHUB 119 - это пространство для быстрого и комфортного развития вашего бизнеса, которое находится в непосредственной близости от станции метро Демеевская, центрального автовокзала и других остановок общественного транспорта.<br><a href=" + "https://skyhub.com.ua" + ">SKY HUB 119</a>",
            type: 'marker',
            coords: [50.407568, 30.514255],
          },    
        ],
      }
    ],
  },
  mounted() {
    this.initMap();
    this.initLayers();
  },
  methods: {
    layerChanged(layerId, active) {
      const layer = this.layers.find(layer => layer.id === layerId);
      
      layer.features.forEach((feature) => {
        if (active) {
          feature.leafletObject.addTo(this.map);
        } else {
          feature.leafletObject.removeFrom(this.map);
        }
      });
    },
    initLayers() {
      this.layers.forEach((layer) => {
        const markerFeatures = layer.features.filter(feature => feature.type === 'marker');
  
        markerFeatures.forEach((feature) => {
          feature.leafletObject = L.marker(feature.coords)
            .bindPopup(feature.name);
        });
      });
    },
    initMap() {
      this.map = L.map('map').setView([50.446376, 30.538273], 10);
      this.tileLayer = L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
        }
      );
        
      this.tileLayer.addTo(this.map);
    },
  },
});