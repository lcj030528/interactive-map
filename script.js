import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("background-color", "#1a1a1a");

const g = svg.append("g");

const projection = d3.geoMercator()
  .center([127.5, 35.9])
  .scale(3000) 
  .translate([width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

const zoom = d3.zoom()
  .scaleExtent([1, 10]) 
  .on("zoom", (event) => {
    g.attr("transform", event.transform); 
  });
svg.call(zoom);

// 하버사인 직선거리 공식
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

const mapUrl = "https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2018/json/skorea-provinces-2018-geo.json";

d3.json(mapUrl).then(function(geoData) {
  
  // 1. 지도 그리기
  g.selectAll(".region")
    .data(geoData.features)
    .enter()
    .append("path")
    .attr("class", "region")
    .attr("d", path)
    .attr("fill", "#2a2a2a")
    .attr("stroke", "#444444")
    .attr("stroke-width", 0.5);

  //1.5 주요 도시 이름 (특별시, 광역시, 특별자치시) 은은하게 깔기
  const majorCities = [
    { name: "서울", coords: [126.9780, 37.5665] },
    { name: "부산", coords: [129.0756, 35.1795] },
    { name: "대구", coords: [128.6014, 35.8714] },
    { name: "인천", coords: [126.7052, 37.4562] },
    { name: "광주", coords: [126.8526, 35.1595] },
    { name: "대전", coords: [127.3845, 36.3504] },
    { name: "울산", coords: [129.3113, 35.5383] },
    { name: "세종", coords: [127.2890, 36.4800] }
  ];

  g.selectAll(".city-label")
    .data(majorCities)
    .enter()
    .append("text")
    .attr("class", "city-label")
    .attr("x", d => projection(d.coords)[0])
    .attr("y", d => projection(d.coords)[1])
    .attr("text-anchor", "middle") // 텍스트 정중앙 정렬
    .attr("fill", "rgba(255, 255, 255, 0.3)") // 배경에 묻히도록 투명도 15% 적용 (워터마크 효과)
    .attr("font-size", "10px") // 글씨를 큼직하게
    .attr("font-weight", "900") // 아주 두껍게
    .style("letter-spacing", "5px") // 자간을 넓혀서 고급스럽게
    .style("pointer-events", "none") // *글씨가 마우스 클릭이나 드래그를 방해하지 않게 유령 취급
    .text(d => d.name);
  // 2. 128개 통합 휴게소 데이터
  const restAreas = [
    { "name": "밀양영남루휴게소", "coords": [128.663721, 35.491308] },
    { "name": "서부산휴게소", "coords": [128.948638, 35.157197] },
    { "name": "남한강휴게소", "coords": [127.466735, 37.482835] },
    { "name": "횡성휴게소", "coords": [128.134709, 37.463869] },
    { "name": "황전휴게소", "coords": [127.454414, 35.151105] },
    { "name": "황간휴게소", "coords": [127.853753, 36.249168] },
    { "name": "화성휴게소", "coords": [126.880185, 37.143555] },
    { "name": "화서휴게소", "coords": [127.922637, 36.444053] },
    { "name": "홍천강휴게소", "coords": [127.827719, 37.712386] },
    { "name": "홍천휴게소", "coords": [128.004840, 37.758134] },
    { "name": "홍성휴게소", "coords": [126.580692, 36.552507] },
    { "name": "현풍휴게소", "coords": [128.436730, 35.701812] },
    { "name": "행담도휴게소", "coords": [126.807525, 36.944819] },
    { "name": "함평천지휴게소", "coords": [126.480271, 35.100217] },
    { "name": "함평나비휴게소", "coords": [126.510245, 35.037741] },
    { "name": "함양휴게소", "coords": [127.759492, 35.551467] },
    { "name": "함안휴게소", "coords": [128.345862, 35.294385] },
    { "name": "하남드림휴게소", "coords": [127.206084, 37.530281] },
    { "name": "평택휴게소", "coords": [126.943774, 37.045585] },
    { "name": "평창휴게소", "coords": [128.458022, 37.608223] },
    { "name": "평사휴게소", "coords": [128.867541, 35.885522] },
    { "name": "통도사휴게소", "coords": [129.090775, 35.488841] },
    { "name": "칠서휴게소", "coords": [128.496807, 35.370880] },
    { "name": "칠곡휴게소", "coords": [128.429659, 36.015900] },
    { "name": "치악휴게소", "coords": [128.048692, 37.255170] },
    { "name": "충주휴게소", "coords": [127.838184, 37.022702] },
    { "name": "춘향휴게소", "coords": [127.352650, 35.337224] },
    { "name": "춘천휴게소", "coords": [127.766078, 37.812680] },
    { "name": "추풍령휴게소", "coords": [128.001787, 36.200032] },
    { "name": "청통휴게소", "coords": [128.859145, 35.993928] },
    { "name": "청주휴게소", "coords": [127.349315, 36.716005] },
    { "name": "청송휴게소", "coords": [129.012609, 36.456223] },
    { "name": "천안호두휴게소", "coords": [127.263879, 36.730226] },
    { "name": "천안삼거리휴게소", "coords": [127.173455, 36.787809] }, 
    { "name": "천등산휴게소", "coords": [127.964275, 37.069235] },
    { "name": "진주휴게소", "coords": [128.122010, 35.159772] },
    { "name": "진영휴게소", "coords": [128.715716, 35.278985] },
    { "name": "진안마이산휴게소", "coords": [127.425821, 35.776359] },
    { "name": "지리산휴게소", "coords": [127.566955, 35.482648] },
    { "name": "죽전휴게소", "coords": [127.104795, 37.332371] }, 
    { "name": "죽암휴게소", "coords": [127.429956, 36.491793] },
    { "name": "주암휴게소", "coords": [127.264931, 35.076392] }, 
    { "name": "정읍녹두장군휴게소", "coords": [126.863171, 35.600720] }, 
    { "name": "장흥정남진휴게소", "coords": [126.931319, 34.720894] },
    { "name": "장유휴게소", "coords": [128.793580, 35.212074] }, 
    { "name": "입장거봉포도휴게소", "coords": [127.192467, 36.942997] },
    { "name": "이천휴게소", "coords": [127.390945, 37.279277] },
    { "name": "이서휴게소", "coords": [127.024732, 35.802934] },
    { "name": "의성휴게소", "coords": [128.446205, 36.410228] },
    { "name": "음성휴게소", "coords": [127.482514, 37.020852] },
    { "name": "원주휴게소", "coords": [127.930416, 37.434868] }, 
    { "name": "울주휴게소", "coords": [129.129477, 35.511991] },
    { "name": "용인휴게소", "coords": [127.240161, 37.246951] },
    { "name": "외동휴게소", "coords": [129.286910, 35.672800] },
    { "name": "와촌휴게소", "coords": [128.775563, 35.951819] },
    { "name": "옥천만남휴게소", "coords": [127.572308, 36.308718] },
    { "name": "옥천휴게소", "coords": [127.597000, 36.297240] },
    { "name": "옥산휴게소", "coords": [127.369817, 36.657743] },
    { "name": "옥계휴게소", "coords": [129.060129, 37.616198] },
    { "name": "오창휴게소", "coords": [127.481843, 36.757531] },
    { "name": "오수휴게소", "coords": [127.310445, 35.540598] },
    { "name": "예산휴게소", "coords": [126.843004, 36.621445] },
    { "name": "영천휴게소", "coords": [129.043483, 36.052353] },
    { "name": "영산휴게소", "coords": [128.495915, 35.429794] },
    { "name": "여주휴게소", "coords": [127.569421, 37.238881] },
    { "name": "여산휴게소", "coords": [127.103525, 36.048542] },
    { "name": "언양휴게소", "coords": [129.141801, 35.597942] },
    { "name": "양산휴게소", "coords": [129.056867, 35.323172] },
    { "name": "안성맞춤휴게소", "coords": [127.274440, 36.968986] }, 
    { "name": "안성휴게소", "coords": [127.138648, 37.045044] },
    { "name": "안산휴게소", "coords": [126.818799, 37.351075] }
    , { "name": "안동휴게소", "coords": [128.643534, 36.553299] },
    { "name": "신탄진휴게소", "coords": [127.418438, 36.426834] },
    { "name": "시흥하늘휴게소", "coords": [126.855452, 37.383794] },
    { "name": "순천휴게소", "coords": [127.445044, 35.008550] },
    { "name": "속리산휴게소", "coords": [127.869061, 36.447804] },
    { "name": "성주휴게소", "coords": [128.260608, 36.009432] },
    { "name": "섬진강휴게소", "coords": [127.770013, 34.985185] },
    { "name": "선산휴게소", "coords": [128.250021, 36.276082] }, 
    { "name": "처인휴게소", "coords": [127.218541, 37.341854] },
    { "name": "서천휴게소", "coords": [126.627160, 36.130717] },
    { "name": "서울만남휴게소", "coords": [127.041908, 37.460166] },
    { "name": "서여주휴게소", "coords": [127.579292, 37.279010] },
    { "name": "서산휴게소", "coords": [126.565666, 36.738593] },
    { "name": "산청휴게소", "coords": [127.938024, 35.333513] },
    { "name": "사천휴게소", "coords": [128.011696, 35.074071] },
    { "name": "부여백제휴게소", "coords": [126.798413, 36.258368] }, 
    { "name": "부안고려청자휴게소", "coords": [126.733333, 35.671613] },
    { "name": "보성녹차휴게소", "coords": [127.181003, 34.807313] },
    { "name": "벌곡휴게소", "coords": [127.272005, 36.214213] },
    { "name": "백양사휴게소", "coords": [126.806369, 35.393722] }, 
    { "name": "문의청남대휴게소", "coords": [127.484205, 36.543314] },
    { "name": "문산휴게소", "coords": [128.151591, 35.171374] }, 
    { "name": "문막휴게소", "coords": [127.837741, 37.316661] }, 
    { "name": "문경휴게소", "coords": [128.151186, 36.620809] }, 
    { "name": "매송휴게소", "coords": [126.890170, 37.264927] },
    { "name": "망향휴게소", "coords": [127.180929, 36.855650] },
    { "name": "마장휴게소", "coords": [127.407043, 37.263849] },
    { "name": "동해휴게소", "coords": [129.073636, 37.601776] },
    { "name": "동명휴게소", "coords": [128.547947, 36.006708] }, 
    { "name": "덕평휴게소", "coords": [127.390189, 37.241456] },
    { "name": "덕유산휴게소", "coords": [127.644661, 35.814955] }, 
    { "name": "대천휴게소", "coords": [126.557006, 36.373726] },
    { "name": "단양팔경휴게소", "coords": [128.304879, 36.969181] },
    { "name": "논공휴게소", "coords": [128.403201, 35.766205] },
    { "name": "내린천휴게소", "coords": [128.286377, 37.916535] },
    { "name": "남성주참외휴게소", "coords": [128.318360, 35.863719] },
    { "name": "김해금관가야휴게소", "coords": [129.003134, 35.269933] },
    { "name": "김천휴게소", "coords": [128.164396, 36.130180] }, 
    { "name": "기흥휴게소", "coords": [127.104595, 37.235125] },
    { "name": "금왕휴게소", "coords": [127.590172, 36.970053] }, 
    { "name": "금산인삼랜드휴게소", "coords": [127.496818, 36.153782] },
    { "name": "금강휴게소", "coords": [127.672231, 36.279148] },
    { "name": "군위휴게소", "coords": [128.575813, 36.266279] },
    { "name": "군산휴게소", "coords": [126.813335, 35.999711] }, 
    { "name": "구정휴게소", "coords": [128.852694, 37.722613] }, 
    { "name": "구리휴게소", "coords": [127.139237, 37.628023] },
    { "name": "괴산휴게소", "coords": [127.958993, 36.831675] }, 
    { "name": "공주휴게소", "coords": [127.165796, 36.497813] }, 
    { "name": "곡성휴게소", "coords": [127.151739, 35.259065] },
    { "name": "고창고인돌휴게소", "coords": [126.673674, 35.465362] },
    { "name": "고성공룡나라휴게소", "coords": [128.257561, 35.054238] }, 
    { "name": "경주휴게소", "coords": [129.192950, 35.724761] }, 
    { "name": "경산휴게소", "coords": [128.810331, 35.879323] },
    { "name": "건천휴게소", "coords": [129.109277, 35.831305] },
    { "name": "거창휴게소", "coords": [128.057454, 35.707666] },
    { "name": "강천산휴게소", "coords": [127.105104, 35.365060] },
    { "name": "강릉휴게소", "coords": [128.806004, 37.759241] }
  ];

  // 3. 휴게소 하얀 점 찍기
  g.selectAll(".rest-area")
    .data(restAreas)
    .enter()
    .append("circle")
    .attr("class", "rest-area")
    .attr("cx", d => projection(d.coords)[0])
    .attr("cy", d => projection(d.coords)[1])
    .attr("r", 1.5) 
    .attr("fill", "#ffffff")
    .attr("opacity", 0.6);

  // 4. 출발지, 도착지 마커 세팅
  const markers = [
    { id: "start", name: "출발지", coords: [126.9780, 37.5665], color: "#00ffcc" },
    { id: "end", name: "도착지", coords: [127.7300, 37.8813], color: "#ff3366" }  
  ];

  // 5. 경로를 그려줄 SVG 선 (Line)
  const line = g.append("path")
    .attr("fill", "none")
    .attr("stroke", "#ffffff")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", "5, 5") 
    .attr("opacity", 0.7);

  // (드래그 중) 실시간 직선거리와 점선을 렌더링하는 함수
  function updateStraightLineAndDistance() {
    line.attr("d", path({
      type: "LineString",
      coordinates: [markers[0].coords, markers[1].coords]
    }))
    .attr("stroke-dasharray", "5, 5") // 점선으로 복구
    .attr("stroke", "#ffffff"); // 흰색으로 복구

    const dist = calculateDistance(
      markers[0].coords[1], markers[0].coords[0],
      markers[1].coords[1], markers[1].coords[0]
    );
    
    const distanceEl = document.getElementById("distance");
    if(distanceEl) distanceEl.innerHTML = `${dist.toFixed(1)}<span style="font-size: 2rem; color: #ffffff;">km (직선)</span>`;
  }

  // 6. 마커 이름(말풍선) 라벨
  const markerLabels = g.selectAll(".marker-label")
    .data(markers)
    .enter()
    .append("text")
    .attr("class", "marker-label")
    .attr("x", d => projection(d.coords)[0])
    .attr("y", d => projection(d.coords)[1] - 25)
    .attr("text-anchor", "middle")
    .attr("fill", "#ffffff")
    .attr("font-size", "10px")
    .attr("font-weight", "bold")
    .style("pointer-events", "none") 
    .style("text-shadow", "0px 0px 5px rgba(0,0,0,0.8)")
    .text(d => d.name);

  // 7. 자석 효과 및 카카오 API 호출 로직
  const KAKAO_REST_KEY = "22f50d3ec25b2fa93ccf676fbd8cdb35"; 

  const drag = d3.drag()
    .on("start", function() {
      d3.select(this).transition().duration(100).attr("r", 2);
    })
    .on("drag", function(event, d) {
      let mouseX = event.x;
      let mouseY = event.y;
      
      let minDistance = Infinity;
      let closestRestArea = null;

      restAreas.forEach(ra => {
        const [raX, raY] = projection(ra.coords);
        const dist = Math.sqrt(Math.pow(mouseX - raX, 2) + Math.pow(mouseY - raY, 2));
        if(dist < minDistance) {
          minDistance = dist;
          closestRestArea = ra;
        }
      });

      let snappedName = "";
      
      if (minDistance < 20) {
        const [snapX, snapY] = projection(closestRestArea.coords);
        mouseX = snapX;
        mouseY = snapY;
        d.coords = [...closestRestArea.coords]; 
        snappedName = closestRestArea.name; 
      } else {
        d.coords = projection.invert([mouseX, mouseY]);
      }

      d3.select(this).attr("cx", mouseX).attr("cy", mouseY);

      markerLabels.filter(label => label.id === d.id)
        .attr("x", mouseX)
        .attr("y", mouseY - 25)
        .text(snappedName ? `${d.name} : ${snappedName}` : d.name) 
        .attr("fill", snappedName ? "#ffcc00" : "#ffffff") 
        .attr("font-size", snappedName ? "12px" : "10px"); 

      // 마우스를 끌고 있을 때는 빠르고 가벼운 직선거리를 보여줍니다.
      updateStraightLineAndDistance(); 
    })
    .on("end", function() {
      d3.select(this).transition().duration(100).attr("r", 2);

      // (마우스를 놓았을 때) 카카오 API를 호출하여 실제 경로와 주행거리를 가져옵니다!
      const origin = `${markers[0].coords[0]},${markers[0].coords[1]}`;
      const destination = `${markers[1].coords[0]},${markers[1].coords[1]}`;

      fetch(`https://apis-navi.kakaomobility.com/v1/directions?origin=${origin}&destination=${destination}`, {
        method: "GET",
        headers: { "Authorization": `KakaoAK ${KAKAO_REST_KEY}` }
      })
      .then(response => response.json())
      .then(data => {
        if(data.routes && data.routes[0]) {
          // 1. 주행 거리 및 시간 텍스트 업데이트
          const distanceKm = (data.routes[0].summary.distance / 1000).toFixed(1);
          const durationMin = Math.round(data.routes[0].summary.duration / 60);

          const distanceEl = document.getElementById("distance");
          if(distanceEl) {
             distanceEl.innerHTML = `${distanceKm}<span style="font-size: 2rem; color: #ff9900;">km (실제주행)</span><br><span style="font-size: 1.5rem; color: #cccccc; font-weight: normal;">약 ${durationMin}분 소요</span>`;
          }

          // 2. 카카오가 보내준 실제 고속도로 궤적(Polyline)을 지도에 그립니다.
          let realRouteCoords = [];
          data.routes[0].sections[0].roads.forEach(road => {
            for(let i=0; i<road.vertexes.length; i+=2) {
              realRouteCoords.push([road.vertexes[i], road.vertexes[i+1]]);
            }
          });

          // 하얀 점선을 카카오내비 스타일의 노란색 실선으로 샥 바꿔줍니다!
          line.attr("d", path({
            type: "LineString",
            coordinates: realRouteCoords
          }))
          .attr("stroke-dasharray", "none") // 점선 제거 (실선)
          .attr("stroke", "#ffcc00"); // 노란색으로 하이라이트
        }
      })
      .catch(error => console.log("길찾기 에러:", error));
    });

  // 8. 마커 렌더링
  g.selectAll(".marker")
    .data(markers)
    .enter()
    .append("circle")
    .attr("class", "marker")
    .attr("cx", d => projection(d.coords)[0]) 
    .attr("cy", d => projection(d.coords)[1]) 
    .attr("r", 2) // 마커 크기 조절
    .attr("fill", d => d.color)
    .attr("stroke", "#ffffff")
    .attr("stroke-width", 2.5)
    .style("cursor", "grab")
    .call(drag);

  updateStraightLineAndDistance();
    
}).catch(function(error) {
  console.log("에러 발생:", error);
});
