class Regions {
	static async getData() {
		const response = await fetch('http://localhost:3000/api/VitebskRegion');
		
		return await response.json();
  }

	static async getFavLocationData() {
		const response = await fetch('http://localhost:3000/api/userAccount');
		
		return await response.json();
  }

	static async getplacesToVisit() {
		const response = await fetch('http://localhost:3000/api/Calendar');

		return await response.json();
  }
}

export default Regions;