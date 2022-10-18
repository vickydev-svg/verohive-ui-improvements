import React from 'react'

export default function Membership(props) {

    const email = props.email

    const Member1month=`https://megahoot.org/mh_api_checkout.php?email=${email}&pgid=EZ238oi19RuQoJWCdBVdR0YuAIoQESwjUUxYTP34RJsG4SG8iDJXqHwxZ2YRk4xTNzsLzhgvgOmy4DJML7bHkmgWnJFV5U4tt4VRjIVWJVkGfvZQkfeqAPzP`;
    const Member12month=`https://megahoot.org/mh_api_checkout.php?email=${email}&pgid=QwJYjRUDckIGpwjioIO2QwdaME3x9lKeKnl1rxIW7e6hmQsNTvjW7K7KtIhpp4Xv2AiwsCZrXbWIoJrx0ltbbMXZrTgUpTY3P1hovQdGZY8x9AUETdODU2QH`;
    const Executive1month=`https://megahoot.org/mh_api_checkout.php?email=${email}&pgid=MhgB6excPEew5YxPAAbg6kQNewsAAtO9hf2fYY5j9uHnQbq0VOo8vaF7a3nzDwBFzhkJrfy6YtJIL9SugktFRSevnZ4jCWlWybaUFhuhXbH2AEt2eJKhfHTY`
    const Executive12month=`https://megahoot.org/mh_api_checkout.php?email=${email}&pgid=eVSCBQpzu5rYMPJFMxMwUoGi5cEQFwVD782x7T5b48aTDQ6aarTC73ToxKKiZdR738BZQ5PmcB3Jt4E0tV5IUtfRnhUzM39nV9harQMDARlisS8F5c4LUTzg`
    const Society1month=`https://megahoot.org/mh_api_checkout.php?email=${email}&pgid=Dv5NqjkdCLwrz37ndsYV0Mbf3QzZkZQLewQzl7XrB2XOG802wEI7OwjggIiET8Ay4Pr3mc4nmTOJn584BAatWxLPSEalliBkGG9wswezq8dDlxbWUkol3KkS`
    const Society12month=`https://megahoot.org/mh_api_checkout.php?email=${email}&pgid=QjSZL4esJI9ix3s8KcFwQJYTk7uvTp5WktoqbMFAAO5AfshpmcIu8icyu0INmWghj2xAF9OhZTF4g77DPsYFDb3z1NdsAAZJ7jazjXqUEEb6d6IEXDx4X7E4`
    const upgradeMembership=`https://megahoot.org/upgrade/?source=PO39IDH98023FJNIOEDPFJ290U846H3U58H93HFE9PDSNIPDONF092H74U803H6T57-056I4KMH89T64J39JE28HE8722GD76F23VBF8B42I3NYVB89032UNV894-HNG983HE7DHC982H2HFH943Y6JEDSG87DGCS8NCV3R89256784Y6NVY729WE45161YDSAVYU-32Y78DC92378Y4D7892YJ489728&e=${email}&string=FD7EFWF89292H32JD092T8934H913BHD1GD8Y91BD91U2N9F8H4389FG3HJ0J01JH8D902HJ10DHJ213GD1789GB94TH5Y9G8YURVN8928923H98C4`
   
    return (
        <div>
            <div className="membership-card">
              <button style={{backgroundColor:'red',color:'white',cursor:'pointer',outline:'none',border:'none',position:'relative',left:'45%'}} onClick={()=>{props.closeMembershipCard('close')}}>X</button>
                <ul>
                <li><h3>Upgrade Membership</h3> <a href={upgradeMembership}  target="_blank">Upgrade Membership</a></li>
                  
                    {/* <li><h3>Member 1 month</h3>
                    <a href={Member1month}  target="_blank">Purchase</a>
                    </li>
                    <li><h3>Member 12 month</h3>
                    <a href={Member12month} target="_blank">Purchase</a>
                    </li>
                    <li><h3>Executive 1 month</h3>
                    <a href={Executive1month} target="_blank">Purchase</a>
                    </li>
                    <li><h3>Executive 12 month</h3>
                    <a href={Executive12month} target="_blank">Purchase</a>
                    </li>
                    */}
                    {/* <li><h3>Society 1 month</h3>
                    <a href={Society1month} target="_blank">Purchase</a>
                    </li>
                    <li><h3>Society 12 month</h3>
                    <a href={Society12month} target="_blank">Purchase</a>
                    </li> */}
                   
                </ul>
            </div>
        </div>
    )
}
