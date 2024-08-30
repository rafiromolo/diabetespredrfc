import { useState } from 'react';
import './style/style.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    hypertension: "",
    heart_disease: "",
    smoking_history: "",
    bmi: "",
    HbA1c_level: "",
    blood_glucose_level: "",
  });
  const [result, setResult] = useState("");
  const [showSpan, setShowSpan] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    let inputData = { ...formData };
    inputData[name] = value;
    setFormData(inputData);
  };

  const handlePredictClick = () => {
    const url = "http://localhost:5000/predict";
    setIsLoading(true);
    const jsonData = JSON.stringify(formData);
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body:jsonData,
    })
      .then((response) => response.json())
      .then((response) => {
        setResult(response.Prediction);
        setIsLoading(false);
        setShowSpan(true);
      });
  };

  return (
    <>
      <div className="bg-primary">
        <h1 className="text-center text-white pt-4">Diabetes Prediction</h1>
        <p className="text-center text-white mb-4">This prediction is developed using Random Forest model. I get the dataset from Kaggle. Link at the bottom.</p>
        <div className="forms container bg-white">
          <form method="post" acceptCharset="utf-8" name="Modelform">
            <div className="form-group mb-3">
              <label htmlFor="gender" className="fw-bold mb-1">Gender</label>
              <br/>
              <select className="selectpicker form-control" name="gender" id="gender" value={formData.gender} onChange={handleChange} required>
                <option value="" disabled>Select your gender</option>
                <option value="0">Female</option>
                <option value="1">Male</option>
                <option value="2">Others</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="age" className="fw-bold mb-1">Age</label>
              <br/>
              <input type="number" className="form-control" id="age" name="age" placeholder="Your age" value={formData.age} onChange={handleChange} required />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="hypertension" className="fw-bold mb-1">Hypertension</label>
              <br/>
              <select className="selectpicker form-control" name="hypertension" id="hypertension" value={formData.hypertension} onChange={handleChange} required>
                <option value="" disabled>Did the patient have hypertension?</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="heartdisease" className="fw-bold mb-1">Heart Disease</label>
              <br/>
              <select className="selectpicker form-control" name="heart_disease" id="heart_disease" value={formData.heart_disease} onChange={handleChange} required>
                <option value="" disabled>Did the patient have heart disease?</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="smokinghistory" className="fw-bold mb-1">Smoking History</label>
              <br/>
              <select className="selectpicker form-control" name="smoking_history" id="smoking_history" value={formData.smoking_history} onChange={handleChange} required>
                <option value="" disabled>Did the patient smoke?</option>
                <option value="0">No Info</option>
                <option value="1">Currently</option>
                <option value="2">Ever</option>
                <option value="3">Former</option>
                <option value="4">Never</option>
                <option value="5">Not Currently</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="bmi" className="fw-bold mb-1">Body Mass Index</label>
              <br/>
              <input type="number" className="form-control" id="bmi" name="bmi" placeholder="Body Mass Index" value={formData.bmi} onChange={handleChange} required />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="hemoglobin" className="fw-bold mb-1">Hemoglobin A1c</label>
              <br/>
              <input type="number" className="form-control" id="HbA1c_level" name="HbA1c_level" placeholder="Hemoglobin A1c" value={formData.HbA1c_level} onChange={handleChange} required />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="bloodglucose" className="fw-bold mb-1">Blood Glucose Level</label>
              <br/>
              <input type="number" className="form-control" id="blood_glucose_level" name="blood_glucose_level" placeholder="Blood Glucose Level" value={formData.blood_glucose_level} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <button className="btn btn-primary form-control" disabled={isLoading} onClick={!isLoading ? handlePredictClick : null}>
                Predict
              </button>
            </div>
          </form>
          <br />
          <div className="text-center">
            <h4>
              Result : {showSpan && (
                <span id="prediction">
                  {result !== "" ? (
                    (result == 0 ? <p>No indication of diabetes</p> : <p>You may have diabetes</p>)
                  ) : (
                    <p>ERROR!</p>
                  )}
                </span>
              )}
            </h4>
          </div>
        </div>
        <div className="socials pb-2">
          <div className="dataset">
            <span className="text-text text-white">Dataset:   </span>
            <span className="link-icon">
              <a href="https://www.kaggle.com/datasets/iammustafatz/diabetes-prediction-dataset/data">
                <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 128 128">
                  <path fill="white" d="M21.139 76.066q-.054.219-.436.218h-4.849c-.291 0-.55-.126-.763-.381L7.083 65.715L4.85 67.841v7.9q0 .544-.544.544H.545Q0 76.286 0 75.741V39.73c0-.362.181-.55.544-.55h3.76q.545 0 .545.55v22.174l9.589-9.697q.381-.38.762-.382h5.013q.326.001.436.272c.073.219.06.381-.062.49L10.46 62.392l10.568 13.13q.219.22.111.545m19.641.218h-3.759q-.6.002-.599-.55v-.764q-2.398 1.797-6.156 1.798q-3.432-.001-5.94-2.124c-1.635-1.452-2.45-3.3-2.45-5.557q-.001-5.34 6.646-7.245q2.614-.764 7.9-1.308q.164-2.014-1.063-3.432q-1.227-1.417-3.569-1.417c-2.034 0-4.104.733-6.21 2.18q-.49.273-.709-.11l-1.955-2.777q-.272-.328.163-.763q4.195-2.888 8.716-2.888q3.488 0 5.94 1.635q3.597 2.397 3.596 7.68v15.09q0 .55-.55.551m-4.36-11.38q-5.339.547-7.3 1.418q-2.67 1.141-2.397 3.27q.163 1.197 1.199 1.933q1.035.736 2.397.843c2.542.183 4.583-.49 6.101-2.015zM63.59 85.736q-2.97 3.079-8.416 3.08q-3.162-.001-5.993-1.58a20 20 0 0 1-1.417-1.01a49 49 0 0 1-1.906-1.552q-.38-.325-.062-.817l2.566-2.566a.58.58 0 0 1 .437-.164a.55.55 0 0 1 .38.164q3.051 3.05 5.939 3.051c4.4 0 6.591-2.288 6.591-6.865v-2.833q-2.559 2.126-6.81 2.126q-5.284 0-8.28-3.977c-1.743-2.324-2.616-5.255-2.616-8.771q0-5.014 2.507-8.494c1.956-2.795 4.74-4.194 8.336-4.194q4.086 0 6.863 2.125v-1.09q0-.544.546-.545h3.76c.361 0 .55.183.55.546v24.352q0 5.935-2.97 9.014m-1.88-26.177q-1.362-3.486-6.319-3.487q-6.373.001-6.372 7.955q0 4.413 2.124 6.428q1.579 1.58 4.086 1.58c3.413 0 5.575-1.162 6.476-3.487zm27.5 26.184q-2.97 3.076-8.416 3.077q-3.161 0-5.994-1.579q-.599-.382-1.415-1.008a50 50 0 0 1-1.907-1.552q-.38-.326-.061-.818l2.566-2.566a.58.58 0 0 1 .436-.164a.55.55 0 0 1 .381.164q3.05 3.05 5.938 3.05q6.6 0 6.6-6.863V74.65c-1.71 1.416-3.973 2.124-6.81 2.124q-5.285 0-8.281-3.976c-1.744-2.324-2.616-5.255-2.616-8.771q0-5.013 2.505-8.493c1.956-2.796 4.741-4.195 8.336-4.195q4.087 0 6.864 2.125v-1.09q0-.543.546-.544h3.758c.363 0 .551.182.551.545v24.352q0 5.935-2.969 9.015m-1.88-26.177q-1.362-3.486-6.319-3.487q-6.374 0-6.374 7.954q0 4.414 2.125 6.427q1.579 1.582 4.086 1.581c3.412 0 5.575-1.162 6.475-3.486v-8.983zm13.184 16.717h-3.76c-.363 0-.55-.18-.55-.55V39.73c0-.362.182-.55.55-.55h3.76c.362 0 .55.182.55.55v36.012c0 .363-.182.55-.55.55m27.4-11.06q-.001.545-.544.546H109.68c.217 1.779.98 3.27 2.288 4.46q2.235 1.907 5.611 1.906c1.998 0 3.79-.562 5.394-1.688q.49-.33.817 0l2.566 2.615c.291.29.291.55 0 .762c-2.615 1.956-5.648 2.942-9.104 2.942q-5.557 0-9.262-3.704q-3.594-3.65-3.595-9.316q-.001-5.34 3.541-9.044q3.27-3.376 8.494-3.377q4.956 0 8.335 3.541q3.486 3.651 3.214 9.153zm-7.136-8.008c-1.234-1.125-2.724-1.69-4.462-1.69q-2.452 0-4.303 1.635c-1.851 1.635-2.016 2.506-2.341 4.25h13.129q-.056-2.506-2.017-4.195"></path>
                </svg>
              </a>              
            </span>
          </div>
          <div className="line text-white">|</div>
          <div className="code">
            <span className="text-text text-white">Code:   </span>
            <span className="link-icon">
              <a href="https://github.com/rafiromolo/diabetespredrfc.git">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 128 128">
                  <g fill="white">
                    <path fillRule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388c0 26.682 17.303 49.317 41.297 57.303c3.017.56 4.125-1.31 4.125-2.905c0-1.44-.056-6.197-.082-11.243c-16.8 3.653-20.345-7.125-20.345-7.125c-2.747-6.98-6.705-8.836-6.705-8.836c-5.48-3.748.413-3.67.413-3.67c6.063.425 9.257 6.223 9.257 6.223c5.386 9.23 14.127 6.562 17.573 5.02c.542-3.903 2.107-6.568 3.834-8.076c-13.413-1.525-27.514-6.704-27.514-29.843c0-6.593 2.36-11.98 6.223-16.21c-.628-1.52-2.695-7.662.584-15.98c0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033c11.526-7.813 16.59-6.19 16.59-6.19c3.287 8.317 1.22 14.46.593 15.98c3.872 4.23 6.215 9.617 6.215 16.21c0 23.194-14.127 28.3-27.574 29.796c2.167 1.874 4.097 5.55 4.097 11.183c0 8.08-.07 14.583-.07 16.572c0 1.607 1.088 3.49 4.148 2.897c23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z" clipRule="evenodd"></path>
                    <path d="M26.484 91.806c-.133.3-.605.39-1.035.185c-.44-.196-.685-.605-.543-.906c.13-.31.603-.395 1.04-.188c.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28c-.396-.42-.47-.983-.177-1.254c.298-.266.844-.14 1.24.28c.394.426.472.984.17 1.255zm2.382 3.477c-.37.258-.976.017-1.35-.52c-.37-.538-.37-1.183.01-1.44c.373-.258.97-.025 1.35.507c.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23c-.527-.487-.674-1.18-.343-1.544c.336-.366 1.045-.264 1.564.23c.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486c-.683-.207-1.13-.76-.99-1.238c.14-.477.823-.7 1.512-.485c.683.206 1.13.756.988 1.237m4.943.361c.017.498-.563.91-1.28.92c-.723.017-1.308-.387-1.315-.877c0-.503.568-.91 1.29-.924c.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117c-.7.13-1.35-.172-1.44-.653c-.086-.498.422-.997 1.122-1.126c.714-.123 1.354.17 1.444.663zm0 0"></path>
                  </g>
                </svg>
              </a>              
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
