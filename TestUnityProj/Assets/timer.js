#pragma strict
var myTimer : float = 5.0;
var stop : System.Boolean = false;
function Start () {

}

function Update () {
	if (!stop) {
		myTimer -= Time.deltaTime;
		Debug.Log(myTimer);
		if (myTimer <= 0) {
			Debug.Log("Game Over");
			stop = true;
		}
	}
}