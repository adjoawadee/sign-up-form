const URL = 'https://demo-api.now.sh/users';


export async function submitFormData(formData) {
    return new Promise((resolve, reject) => {
      fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then((response) => {
        if (!response.ok) {
          reject(new Error('Error submitting form'));
        } else {
          resolve(response)
        }
      }).catch((error) => {
        reject(error);
      });
    })
}

export async function fetchFormData() {
  return new Promise((resolve, reject) => {
    fetch(URL, {
      method: 'GET'
    })
    .then((response) => {
      if (!response.ok) {
        reject(new Error('Error fetching data'));
      } else {
        resolve(response.json())
      }
    }).catch((error) => {
      reject(error);
    });
  })
}
  
  
  
  