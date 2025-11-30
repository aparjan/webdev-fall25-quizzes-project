export default function ConditionalOutputIfElse() {
    const loggedIn = true;
    if (loggedIn) {
        return <h3 id="wd-conditional-output-if-else-welcome">Welcome If Else</h3>;
    } else {
        return (<h2 id="wd-conditional-output-if-else-login">Please login If Else</h2>);
    }
}