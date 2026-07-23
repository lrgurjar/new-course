const UserCard = React.memo(function UserCard({ user, onClick }) {
    return <button onClick={onClick}>{user.name}</button>;
});

function Parent5() {
    const user = React.useMemo(() => ({ name: "Ava" }), []);
    const onClick = React.useCallback(() => {
        console.log("clicked");
    }, []);

    return <UserCard user={user} onClick={onClick} />;
}