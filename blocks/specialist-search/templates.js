export function createResultsSection() {
  const section = document.createElement('div');

  section.className = 'cmp-specialist__result-section';
  section.style.display = 'none';

  section.innerHTML = `
     <section class="cmp-result__googlemap">
      <div id="cmp-googlemap__placeholder" class="cmp-googlemap__maparea" >

        <div  class="cmp-googlemap__placeholder">
          <strong>Google Maps Placeholder</strong>
          <p>
            Lat:
            <span class="map-lat"></span>
          </p>

          <p>
            Lng:
            <span class="map-lng"></span>
          </p>

        </div>

      </div>
    </section>

    <div class="cmp-specialist__result">

      <p>Results for Your Area</p>

      <div class="cmp-result__doctormiles">

        <span class="cmp-result__length">
        </span>

        specialists within

        <select id="cmp-specialist__selectradius">

          <option selected>10</option>
          <option>20</option>
          <option>30</option>

        </select>

        <span class="cmp-result__distance">
          miles of
          <span class="cmp-result__zipCode"></span>
        </span>

      </div>

    </div>

    <section class="cmp-result__list-section">
      <div class="cmp-result__lists"></div>
    </section>

  `;

  return section;
}

export function renderProvider(provider) {
  return `
    <div class="cmp-panel">
      <div class="cmp-specialistsdetails">
        <div class="cmp-specialistsdetails__desktop">
          <div class="row">

            <div class="cmp-specialistsdetails__coloumn cmp-coloumn__doctorname">
              ${provider.firstName} ${provider.lastName}
            </div>

            <div class="cmp-specialistsdetails__coloumn cmp-coloumn__specialty">
              ${provider.specialty}
            </div>

            <div class="cmp-specialistsdetails__coloumn cmp-coloumn__addressSection">

              <div class="cmp-addressContainer">
                <span class="cmp-coloumn__address">
                  ${[
                    provider.primaryAddress,
                    provider.addtionalPrimaryAddress,
                    provider.city,
                    provider.state,
                    provider.zipCode,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </span>

                tel:${provider.phNumber}
                  ${provider.phNumber}
                </a>

              </div>

            </div>

            <div class="cmp-specialistsdetails__coloumn cmp-coloumn__miles">
              ${provider.distance} miles
            </div>

          </div>
        </div>
      </div>
    </div>
  `;
}