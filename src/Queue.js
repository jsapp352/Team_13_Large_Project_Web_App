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
        fetch(url).then(response => response.json()).then(data => {

            for (let i = 0; i < data.length; i++) {
                if (data[i].active) {
                    course_arr.push(data[i].courseName)
                    course_ids.push(data[i].courseId)

                    let obj_state = {};
                    fetch('https://protected-shelf-85013.herokuapp.com/session/waiting/' + data[i].courseId + '/')
                        .then(resp => resp.json()).then(list => {
                            obj_state.course_title = data[i].courseName
                            obj_state.courseId = data[i].courseId
                            obj_state.waitlist = list
                            this.setState({loading:true})
                        })
                    obj_arr.push(obj_state);
                }
            }
            this.setState({ courses: course_arr })
            this.setState({ course_ids: course_ids })
            //this.setState({ courses_and_lists: obj_arr })

        });
       this.setState({ courses_and_lists: obj_arr })
        this.setState({ loading1: false })
    }

    
    render() {
        let arrya = []
        let courses = this.state.courses.length
        let tabList = this.state.courses.map((data, index) => <Tab key={index}>  {data}</Tab>)
        let dataList =[]// this.state.courses_and_lists.map((data,index) => <div>{data.waitlist.studentName}</div>)
       // let panelList = []
        if(this.state.courses_and_lists[2] !== undefined)
        {
            //console.log("it is not undefined")
            if(this.state.courses_and_lists[2].waitlist !== undefined)
            {
                //console.log(this.state.courses_and_lists[2].waitlist)   
            }
        }
        
       //panelList.push(<TabPanel>{dataList}</TabPanel>)
       let sPanel =[]

        if(this.state.courses_and_lists !== undefined)
        {
            for(let i = 0;i < this.state.courses_and_lists.length; i++)
            {
                let panelList = []
                if(this.state.courses_and_lists[i] !== undefined)
                {
                    //console.log(this.state.courses_and_lists[i])
                    if(this.state.courses_and_lists[i].waitlist !== undefined ) 
                    {
                        //console.log(this.state.courses_and_lists[i].waitlist)
                        for(let j = 0;j < this.state.courses_and_lists[i].waitlist.length;j++)
                        {
                            panelList.push(this.state.courses_and_lists[i].waitlist[j].studentName)
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
                <Tabs>
                    <TabList>
                        {tabList}
                    </TabList>
                    {sPanel.map((data,index) =><TabPanel key ={index }><div>{data}</div></TabPanel>)}
                </Tabs>
            </div>
        )


    }
}

export default Queue;