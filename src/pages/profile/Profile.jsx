import React, { useContext } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import CryptoJS  from 'crypto-js';
import { AuthContext } from '../../context/AuthContext.js';
import useFetch from '../../useFetch/useFetch';

const Profile = () => {
const {user,key} = useContext(AuthContext)
    if(user != null){
      const data = CryptoJS.AES.decrypt(user,key);
      var token = JSON.parse(data.toString(CryptoJS.enc.Utf8));
      var id = token.id
    };

const {datas,error,loading} = useFetch(`http://localhost:8800/api/auth/getUser/${id}`)
console.log(datas)
console.log(id)

  return (
    <section style={{ backgroundColor: '#eee', marginTop:"40px" }}>
      <MDBContainer className="py-5">
      

        <MDBRow style={{justifyContent:"center",display:"flex"}}>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={datas.image? datas.image
                :'/images/user.jpg'}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <div className="d-flex justify-content-center mb-2">
                </div>
              </MDBCardBody>
            </MDBCard>

          </MDBCol >
          <MDBCol style={{marginTop:"70px"}} lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{datas.username}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{datas.address}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default Profile