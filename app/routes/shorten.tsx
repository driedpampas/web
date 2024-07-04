import { createRoute } from 'honox/factory'
//import { getCookie, setCookie } from 'hono/cookie'
import { svgi } from '../components/svg';
import { FC } from 'hono/jsx';
import BoxContainer from '../components/Boxtainer';

const UserButton: FC/*<{ isLoggedIn: boolean }> = ({ isLoggedIn })*/  = () => {
	/*if (isLoggedIn) {
		return (
			<a href="https://dry.nl.eu.org/me">
				<img alt="" src={svgi + "IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogPGcgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICA8cGF0aCBkPSJtMTIgMmMtNS41MjI4NSAwLTEwIDQuNDc3MTUtMTAgMTAgMCA1LjUyMjggNC40NzcxNSAxMCAxMCAxMCA1LjUyMjggMCAxMC00LjQ3NzIgMTAtMTAgMC01LjUyMjg1LTQuNDc3Mi0xMC0xMC0xMHoiIHN0eWxlPSJzdHJva2U6I2ZmZiIvPgogIDxwYXRoIGQ9Im00LjI3MSAxOC4zNDU3czIuMjI5MDItMi44NDU3IDcuNzI5LTIuODQ1N2M1LjUgMCA3LjcyOTEgMi44NDU3IDcuNzI5MSAyLjg0NTciIHN0eWxlPSJzdHJva2U6I2ZmZiIvPgogIDxwYXRoIGQ9Im0xMiAxMmMxLjY1NjkgMCAzLTEuMzQzMSAzLTMgMC0xLjY1Njg1LTEuMzQzMS0zLTMtM3MtMyAxLjM0MzE1LTMgM2MwIDEuNjU2OSAxLjM0MzEgMyAzIDN6IiBzdHlsZT0ic3Ryb2tlOiNmZmYiLz4KIDwvZz4KPC9zdmc+Cg=="} />
			    Account
			</a>
		);
	} else {*/
		return (
			<a href="https://dry.nl.eu.org/login">
				<img alt="" src={svgi + "IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogPGcgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICA8cGF0aCBkPSJtMTcgMTBoM20zIDBoLTN2LTNtMCAzdjMiIHN0eWxlPSJzdHJva2U6I2ZmZiIvPgogIDxwYXRoIGQ9Im0xIDIwdi0xYzAtMy44NjYgMy4xMzQwMS03IDctNyAzLjg2NiAwIDcgMy4xMzQgNyA3djEiIHN0eWxlPSJzdHJva2U6I2ZmZiIvPgogIDxwYXRoIGQ9Im04IDEyYzIuMjA5MSAwIDQtMS43OTA5IDQtNCAwLTIuMjA5MTQtMS43OTA5LTQtNC00LTIuMjA5MTQgMC00IDEuNzkwODYtNCA0IDAgMi4yMDkxIDEuNzkwODYgNCA0IDR6IiBzdHlsZT0ic3Ryb2tlOiNmZmYiLz4KIDwvZz4KPC9zdmc+Cg=="} />
				Login	
			</a>
		);
	//}
};

export default createRoute((c) => {
  return c.render(
    <BoxContainer>
      <div className="header">
        <a href="https://dry.nl.eu.org/links">
          <img alt="" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iRGFzaGJvYXJkLUZpbGwtLVN0cmVhbWxpbmUtUmVtaXgtRmlsbC5zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iIzAwMDAwMCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTYgMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8ZGVzYz5EYXNoYm9hcmQgRmlsbCBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbTwvZGVzYz4KIDxwYXRoIGQ9Im0wLjE2IDhjMCAwLjQ4MTEzMzMzMzMgMC4zOSAwLjg3MTEzMzMzMzMgMC44NzExMzMzMzMzIDAuODcxMTMzMzMzM2g1LjIyNjY2NjY2N2MwLjQ4MTA2NjY2NjcgMCAwLjg3MTA2NjY2NjctMC4zOSAwLjg3MTA2NjY2NjctMC44NzExMzMzMzMzdi02Ljk2ODg2NjY2N2MwLTAuNDgxMTMzMzMzMy0wLjM4OTkzMzMzMzMtMC44NzExMzMzMzMzLTAuODcxMDY2NjY2Ny0wLjg3MTEzMzMzMzNoLTUuMjI2NjY2NjY3Yy0wLjQ4MTEzMzMzMzMgMC0wLjg3MTEzMzMzMzMgMC4zOS0wLjg3MTEzMzMzMzMgMC44NzExMzMzMzMzdjYuOTY4ODY2NjY3em0wIDYuOTY4ODY2NjY3YzAgMC40ODExMzMzMzMzIDAuMzkgMC44NzExMzMzMzMzIDAuODcxMTMzMzMzMyAwLjg3MTEzMzMzMzNoNS4yMjY2NjY2NjdjMC40ODEwNjY2NjY3IDAgMC44NzEwNjY2NjY3LTAuMzkgMC44NzEwNjY2NjY3LTAuODcxMTMzMzMzM3YtMy40ODQ0YzAtMC40ODExMzMzMzMzLTAuMzg5OTMzMzMzMy0wLjg3MTEzMzMzMzMtMC44NzEwNjY2NjY3LTAuODcxMTMzMzMzM2gtNS4yMjY2NjY2NjdjLTAuNDgxMTMzMzMzMyAwLTAuODcxMTMzMzMzMyAwLjM5LTAuODcxMTMzMzMzMyAwLjg3MTEzMzMzMzN2Mi40ODQ0em04LjcxMTEzMzMzMyAwYzAgMC40ODExMzMzMzMzIDAuMzkgMC44NzExMzMzMzMzIDAuODcxMDY2NjY2NyAwLjg3MTEzMzMzMzNoNS4yMjY2NjY2NjdjMC40ODExMzMzMzMzIDAgMC44NzExMzMzMzMzLTAuMzkgMC44NzExMzMzMzMzLTAuODcxMTMzMzMzM3YtNi45Njg4NjY2NjdjMC0wLjQ4MTEzMzMzMzMtMC4zOS0wLjg3MTEzMzMzMzMtMC44NzExMzMzMzMzLTAuODcxMTMzMzMzM2gtNS4yMjY2NjY2NjdjLTAuNDgxMDY2NjY2NyAwLTAuODcxMDY2NjY2NyAwLjM5LTAuODcxMDY2NjY2NyAwLjg3MTEzMzMzMzN2Ni45Njg4NjY2Njd6bTAuODcxMDY2NjY2Ny0xNC44MDg4NjY2N2MtMC40ODEwNjY2NjY3IDAtMC44NzEwNjY2NjY3IDAuMzktMC44NzEwNjY2NjY3IDAuODcxMTMzMzMzM3YzLjQ4NDRjMCAwLjQ4MTEzMzMzMzMgMC4zOSAwLjg3MTEzMzMzMzMgMC44NzEwNjY2NjY3IDAuODcxMTMzMzMzM2g1LjIyNjY2NjY2N2MwLjQ4MTEzMzMzMzMgMCAwLjg3MTEzMzMzMzMtMC4zOSAwLjg3MTEzMzMzMzMtMC44NzExMzMzMzMzdi0zLjQ4NDRjMC0wLjQ4MTEzMzMzMzMtMC4zOS0wLjg3MTEzMzMzMzMtMC44NzExMzMzMzMzLTAuODcxMTMzMzMzM2gtNS4yMjY2NjY2Njd6IiBzdHlsZT0iZmlsbDojZmZmIi8+Cjwvc3ZnPgo=" />
          Home
        </a>
        <UserButton />
      </div>
      <h1>Canada Dry</h1>
      <h6>what's a service of terms?</h6>
      <input type="text" id="link-input" name="link" placeholder="Enter a link" hx-post="/v1/add" hx-swap="morph:{ignoreActiveValue:true}" hx-target="#shortened-link" hx-trigger="click from:#submit-link" required />
      <button id="submit-link">Submit</button>
      <div id="shortened-link"></div>
    </BoxContainer>,
    { title: 'Shorten' }
  )
})
