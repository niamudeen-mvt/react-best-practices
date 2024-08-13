import React from "react";
import { Container } from "react-bootstrap";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Loader from "../../components/loader";

const User = () => {
  const { currentUser } = useLocalStorage();

  return (
    <section className="bg-body-secondary">
      {Object.keys(currentUser).length !== 0 ? (
        <Container className="min-vh-100 flexCenter">
          <div className="w-100 flexCenter py-5 shadow-sm bg-white rounded-3">
            <form className="px-4">
              <div className="mb-5">
                <label>Username</label>
                <input
                  type="text"
                  autoComplete="off"
                  spellCheck={"false"}
                  className="px-2 py-3 border-0 border-bottom bg-transparent w-100 border-black text-secondary text-capitalize"
                  value={currentUser?.username}
                  disabled
                />
              </div>
              <div className="mb-5">
                <label>Email</label>
                <input
                  type="text"
                  autoComplete="off"
                  spellCheck={"false"}
                  className="px-2 py-3 border-0 border-bottom bg-transparent w-100 border-black text-secondary"
                  disabled
                  value={currentUser?.email}
                />
              </div>
              <div className="">
                <label>Phone</label>
                <input
                  type="text"
                  autoComplete="off"
                  spellCheck={"false"}
                  className="px-2 py-3 border-0 border-bottom bg-transparent w-100 border-black text-secondary"
                  disabled
                  value={currentUser?.phone}
                />
              </div>
            </form>
          </div>
        </Container>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default User;
