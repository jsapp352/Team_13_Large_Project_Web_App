import React from "react";
import pic from '../img/profile-cover.jpg';
import { Image, Container } from 'react-bootstrap';

class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			role: '',
			pin: 0
		}
		this.decryptPin = this. decryptPin.bind(this)
	}

	componentDidMount(props) {
		this.setState({
			firstName: this.props.firstName,
			lastName: this.props.lastName,
			role: this.props.role,
			pin: this.props.pin
		})
	}

	decryptPin(pin) {
// 		if (pin !== undefined && pin !== 0 && pin !== '') {
// 	        var CryptoJS = require("crypto-js");
	
// 			let temp = CryptoJS.enc.Utf8.parse(pin)
// 	        // This secret key phrase must match the one on the API server.
// 	        // Should be replaced with environment variable.
// 	        const keyString = "hurricanstrictor";
// 			var key = CryptoJS.enc.Utf8.parse(keyString);
// 			console.log(key);
// 	        // Convert the key string to a data array type
// 	        // var key = CryptoJS.enc.Utf8.parse(keyString);

// 	        // Decrypt the PIN
// 	        var bytes = CryptoJS.AES.decrypt(temp, key);

// 			console.log(bytes)

// 		let dec = CryptoJS.AES.decrypt(pin, key, {
//             mode: CryptoJS.mode.ECB,
//             padding: CryptoJS.pad.Pkcs7
//        		 });

// 			console.log(CryptoJS.enc.Utf8.stringify(dec))

// var data =  CryptoJS.AES.encrypt(pin, key, {
//             mode: CryptoJS.mode.ECB,
//             padding: CryptoJS.pad.Pkcs7
//         }); // Encryption Part

// console.log(data)
// var decrypted = CryptoJS.AES.decrypt(data,  key,{
//             mode: CryptoJS.mode.ECB,
//             padding: CryptoJS.pad.Pkcs7
//         }).toString(CryptoJS.enc.Utf8);
// console.log(decrypted)
			
        	// console.log("Bytes: " + bytes)

	        // var plaintext = bytes.toString(CryptoJS.enc.Utf8);

	        // console.log('PIN: ' + pin + ' | ' + plaintext);
        	// return plaintext;
        // }
    }

	reload(e) {
		e.preventDefault();
		window.location.reload();
	}

	render() {
		const name = this.state.firstName + ' ' + this.state.lastName;
		const user = (this.state.role === 'admin') ? 'Administrator' : name

		const path = (this.state.role === 'admin') ? '/admin' : '/assistant';

		const pin = (this.state.role === 'admin') ? '' : ('Kiosk Pin: ' + this.decryptPin(this.state.pin));

		return (
			<Container fluid className="header">
				<div className="topBar">
					<div onClick={this.reload} className="title">THE CAVE</div>
				</div>
				<div className="information" style={{height: '200px'}}>
					<div className="anotherCircleContainer">
						<div className="float-left" style={{margin: '0 40px'}}>
							<Image className="circle" id="picture" src={pic} fluid roundedCircle />
							<div style={{float: 'right', textAlign: 'left', display: 'flex'}}>
								<span className="caption" style={{whiteSpace: 'nowrap'}} id="name">
									{user}<br/><span style={{fontWeight: '600', fontSize: '.6em'}}>{pin}</span>
								</span>
							</div>
						</div>
					</div>
				</div>
			</Container>
		)
	}
}

export default Header;
