function Test() {
  const myName = "Jaden";
  const yourName = undefined;
  return (
    <>
      <h1>JSX는 하나의 요소를 리턴한다.</h1>
      <p>
        div로 하기 싫다면 프래그먼트를 이용하자 그냥 빈 괄호를 사용하면 된다.
      </p>
      <hr />
      <h1>자바스크립트 표현이 가능하다.</h1>

      <div>{myName}을 바로 사용할 수 있다.</div>
      <hr />
      <h1>
        if문 사용할 수 없다. 삼항연산자 또는 && 연산자, || 연산자 사용한다.
      </h1>
      <div>
        {myName === "Jaden" ? <p>내이름 제이든</p> : <p> 내이름 아닌데?</p>}
      </div>
      <hr />
      <h1>AND 연산자</h1>
      <div>{myName === "Jaden" && <p>제 이름은 제이든 입니다.</p>}</div>
      <p>
        조건에 맞지 않으면 아무것도 렌더링 하지 않을 때. AND연산자를 사용하면
        좋다.
      </p>
      <hr />
      <h1>undifiend를 렌더링 하지 않기 - OR 연산자</h1>
      <div>{yourName || "너의 이름은 undefiend이다."}</div>
      <p>
        yourName의 값이 undefiend일 때 보여주고 싶은 문구가 있다면 ||연산자 뒤에
        넣어둔다.
      </p>
    </>
  );
}

export default Test;
