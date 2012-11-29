#pragma strict
var thePrefab : GameObject;

function Start () {

}

function Update () {
	if (Input.GetButtonDown("Jump")) {
		var instance : GameObject = Instantiate(thePrefab, this.transform.position, this.transform.rotation);	
		
	}
}