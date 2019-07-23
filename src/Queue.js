import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { ClipLoader } from 'react-spinners';
//import DataControl from './DataControl'



class Queue extends React.Component {
    constructor() {
        super();
        this.state = {
            current_course: 0,
            current_list: [],
            course_list: [],
            course_ids: [],
            courses: ['Kim', 'Tim', 'Kim', 'Tim', 'Kim', 'Tim', 'Kim', 'Tim'],
            waitlist: ['Kim', 'Tim'],
            loading1: true,
            loading: true
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
        fetch(url).then(response => response.json()).then(data => {

            for (let i = 0; i < data.length; i++) {
                if (data[i].active) {
                    course_arr.push(data[i].courseName)

                    course_ids.push(data[i].courseId)

                    obj_arr = data
                    //console.log(obj_arr)
                    fetch('https://protected-shelf-85013.herokuapp.com/session/waiting/' + data[i].courseId + '/')
                        .then(resp => resp.json()).then(list => {

                            console.log(list)
                            if (list.length > 0) {
                                temp_list.push(list)

                            }
                            this.setState({ current_list: temp_list })
                            //console.log(this.state.current_list)
                        })
                }
            }
            this.setState({ courses: course_arr })
            this.setState({ course_ids: course_ids })
        });
        this.setState({ courses_and_lists: obj_arr })
        this.setState({ loading1: false })
    }

    render() {
        let hell = this.state.courses.map((data, index) => <Tab key={index}>  {data}</Tab>)
        
        let arrya = []

        // for (let me = 0; me < this.state.courses.length; me++) {
            arrya.push(<TabPanel>{eachTab.map((data, index) => <div key={index} > {data} </div>)}</TabPanel>)
        // }
        return (
            <div>
                <Tabs>
                    <TabList>
                        {hell}
                    </TabList>

                </Tabs>
            </div>
        )
    }
}

export default Queue;