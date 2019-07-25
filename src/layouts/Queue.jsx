import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { ClipLoader } from 'react-spinners';
import { Table, Container } from 'react-bootstrap';
import Sidebar from '../components/Sidebar.jsx';
//import DataControl from './DataControl'

class Queue extends React.Component {
	constructor() {
		super();
		this.state = {
			current_course: 0,
			current_list: [],
			course_list: [],
			course_ids: [],
			courses: [],
			waitlist: [],
			loading1: true,
			loading: true,
			courses_and_lists: []
		}
	}

	componentWillMount() {
		let course_arr = [];
		let course_ids = [];
		let temp_list = [];
		let obj_arr = [];
		let tabing = []
		let eachTab = []
		let fullTab = []

		let url = 'https://protected-shelf-85013.herokuapp.com/course/'
		fetch(url)
			.then(response => response.json())
			.then(data => {
				for (let i = 0; i < data.length; i++) {
					if (data[i].active) {
						course_arr.push(data[i].courseName)
						course_ids.push(data[i].courseId)

						let obj_state = {};
						fetch('https://protected-shelf-85013.herokuapp.com/session/waiting/' + data[i].courseId + '/')
							.then(resp => resp.json())
							.then(list => {
								obj_state.course_title = data[i].courseName
								obj_state.courseId = data[i].courseId
								obj_state.waitlist = list
								this.setState({loading: true})
							})

						obj_arr.push(obj_state);
					}
				}

				this.setState({courses: course_arr})
				this.setState({course_ids: course_ids})
				// this.setState({ courses_and_lists: obj_arr })
			});

		this.setState({courses_and_lists: obj_arr})
		this.setState({loading1: false })
	}

	
	render() {
		let arrya = []
		let courses = this.state.courses.length
		let tabList = this.state.courses.map((data, index) => <Tab key={index}>  {data}</Tab>)
		let dataList = []
		// this.state.courses_and_lists.map((data,index) => <div>{data.waitlist.studentName}</div>)
		// let panelList = []

		if (this.state.courses_and_lists[2] !== undefined)
		{
			// console.log("it is not undefined")
			if (this.state.courses_and_lists[2].waitlist !== undefined)
			{
				// console.log(this.state.courses_and_lists[2].waitlist)   
			}
		}
		
		// panelList.push(<TabPanel>{dataList}</TabPanel>)
		let sPanel = []

		if (this.state.courses_and_lists !== undefined)
		{
			for (let i = 0; i < this.state.courses_and_lists.length; i++)
			{
				let panelList = []
				if (this.state.courses_and_lists[i] !== undefined)
				{
					// console.log(this.state.courses_and_lists[i])
					if (this.state.courses_and_lists[i].waitlist !== undefined ) 
					{
						// console.log(this.state.courses_and_lists[i].waitlist)
						for (let j = 0; j < this.state.courses_and_lists[i].waitlist.length; j++)
						{
							panelList.push(
								<tr style={{width: '100%', display: 'inline-block'}}>
									<td style={{width: '10%', display: 'inline-block'}}>{j+1}</td>
									<td style={{width: '45%', display: 'inline-block'}}>{this.state.courses_and_lists[i].waitlist[j].studentName}</td>
									<td style={{width: '40%', display: 'inline-block'}}>{(j+1)*10} min.</td>
								</tr>
								
							)
						}
					}
				}

				sPanel.push(panelList) 
				console.log(panelList)
			}
		}     
		
		let i = 0;

		return (
			<div>
				<Container fluid className="header">
					<div className="topBar" style={{backgroundColor: '#E0B400'}}>
						<div className="title">THE CAVE</div>
					</div>
				</Container>
				<Container fluid style={{height: '90vh'}}>
					<div style={{height: 'calc(100vh - 290px)', margin: '0'}}>
						<div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'no-wrap', height: '100%', margin: '0 auto', width: '90vw', paddingTop: '50px'}}>
							<Sidebar userType="any" />
							<div style={{width: '87%', height: 'auto', padding: '0 30px'}}>
								<div className="sub-title"><span id="top-line"/>Queue</div>
								<Tabs style={{borderRadius: '0'}}>
									<TabList>
										{tabList}
									</TabList>
									<Table borderless hover responisve="true" className="header-fixed" style={{cursor: 'default', width: '100%'}}>
										<thead style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>
											<tr>
												<th style={{width: '10%'}}>#</th>
												<th style={{width: '45%'}}>Student</th>
												<th style={{width: '40%'}}>Wait Time</th>
											</tr>
										</thead>
									   <tbody style={{width: '100%'}}>
											{sPanel.map((data, index) => <TabPanel key ={index}><div>{data}</div></TabPanel>)}
									   </tbody>
									</Table>
								</Tabs>
							</div>
						</div>
					</div>
				</Container>
			</div>
		)
	}
}

				// <Table borderless striped hover responisve="true" className="header-fixed">
				//     <thead style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
				//          <tr>
				//                <th>First Name</th>
				//                <th>Last Name</th>
				//                <th className="d-none d-sm-block">Course</th>
				//          </tr>
				//     </thead>
				//    <tbody>
				//          {taTable}
				//    </tbody>
				// </Table>
				// <Button onClick={this.showModal} className="add-ta"> 
				//     Add TA <FontAwesomeIcon style={{margin: '0 10px'}} icon={faPlus} />
				// </Button>

				// <AddTA show={this.state.show} handleClose={this.hideModal} />

export default Queue;