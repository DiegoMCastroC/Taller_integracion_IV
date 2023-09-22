export async function login(correo, contra) {
  try {
    const response = await fetch('http://192.168.0.14:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correo, contra }),
    });
    console.log(response);
    if (response.status === 200) {
      const data = await response.json();
      return { success: true, message: data.message };
    } else {
      const data = await response.json();
      return { success: false, message: data.message };
    }
  } catch (error) {
    return { success: false, message: 'Error de conexión' };
  }
}
