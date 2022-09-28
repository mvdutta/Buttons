import { Requests } from "./Requests.js";
import { ServiceForm } from "./ServiceForm.js";

export const HireAClown = () => {
    return `
    <header class="header-area">
    <img class="logo-img" src="images/new-clown-logo.png" alt="">
    </header>
    <div class="content-container">
      <section class="serviceForm">
      <div>
      <img class="balloon-img" src="images/balloons.png" alt="">
      </div>
        <div class="field-area">
        ${ServiceForm()}
        </div>
        <div>
        <img class="clown-img" src="images/clown-pic.webp" alt="">
        </div>
      </section>
      <section class="serviceRequests">
          <h2 class="requests-header">Reservation Requests</h2>
          <div class="request-header">
          <div class="area-1">Description</div>
          ${Requests()}
          </div>   
      </section>
      </div>
      `;
  };
  