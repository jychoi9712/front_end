import { act, fireEvent, render } from "@testing-library/react";
import Button from "./Button";
import { useFakeTimers } from "@testing-library/jest-dom";

describe("Button 컴포넌트 (@testing-library/react", () => {
    it("컴포넌트가 정상적으로 생성된다.", () => {
        const button = render(<Button />);
        expect(button).not.toBe(null);
    });

    it("button 이라고 쓰여있는 엘리먼트는 HTMLButtonElement 이다", () => {
        const { getByText } = render(<Button />);
        const buttonElement = getByText("button");

        expect(buttonElement).toBeInstanceOf(HTMLButtonElement);
    });

    it('버튼을 클릭하면, p 태그 안에 "버튼이 방금 눌렸다." 라고 쓰여진다.', () => {
        const { getByText } = render(<Button />);
        const buttonElement = getByText("button");

        fireEvent.click(buttonElement);

        const pElement = getByText("버튼이 방금 눌렸다.");
        expect(pElement).not.toBeNull();
        expect(pElement).toBeInstanceOf(HTMLParagraphElement);
    });

    it('버튼을 클릭하기 전에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.', () => {
        const { getByText } = render(<Button />);

        const pElement = getByText("버튼이 눌리지 않았다.");
        expect(pElement).not.toBeNull();
        expect(pElement).toBeInstanceOf(HTMLParagraphElement);
    });

    it('버튼을 클릭하고 5초 뒤에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.', () => {
        jest.useFakeTimers();

        const { getByText } = render(<Button />);
        const buttonElement = getByText("button");

        fireEvent.click(buttonElement);

        act(() => {
            jest.advanceTimersByTime(5000);
        });

        const pElement = getByText("버튼이 눌리지 않았다.");
        expect(pElement).not.toBeNull();
        expect(pElement).toBeInstanceOf(HTMLParagraphElement);
    });

    it("버튼을 클릭하면, 5초 동안 버튼이 비활성화 된다.", () => {
        jest.useFakeTimers();

        const { getByText } = render(<Button />);
        const buttonElement = getByText("button");

        fireEvent.click(buttonElement);

        // expect(buttonElement.disabled).toBeTruthy();

        // jest-dom
        expect(buttonElement.disabled).toBeDisabled();

        act(() => {
            jest.advanceTimersByTime(5000);
        });

        // expect(buttonElement.disabled).toBeFalsy();

        // jest-dom //
        expect(buttonElement.disabled).not.toBeDisabled();
    });
});
