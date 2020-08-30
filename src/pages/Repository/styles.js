import styled from 'styled-components'

export const Loading = styled.div`
  color: #FFF;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
        color: #7159C1;
        font-size: 16px;
        text-decoration: none;
    }

    img {
        width: 120px;
        border-radius: 50%;
        margin-top: 20px;
    }

    h1 {
        font-size: 24px;
        margin-top: 10px;
    }

    p {
        margin-top: 5px;
        font-size: 14px;
        color: #666;
        line-height: 1.4;
        text-align: center;
        max-height: 400px;
    }
`

export const IssueList = styled.ul`
    padding-top: 30px;
    margin-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;
        border: 1px solid #eee;
        border-radius: 4px;

        & + li {
            margin-top: 10px;
        }

        img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #eee;
        }

        div {
            flex: 1;
            margin-left: 15px;

            strong {
                font-size: 16px;

                a {
                    text-decoration: none;
                    color: #333;

                    &:hover {
                        color: #7159c1;
                    }
                }

                span {
                    background: #eee;
                    color: #333;
                    border-radius: 2px;
                    font-size: 12px;
                    font-weight: 600;
                    height: 20px;
                    padding: 3px 4px;
                    margin-left: 10px;
                }

            }

            p {
            margin-top: 5px;
            font-size: 12px;
            color: #999;
            }

        }
    }
`

export const SelectStatus = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0 10px 20px 10px;

    label {
        color: #7159c1;
        font-weight: 600;
        margin: 0 20px 0px 2px;
    }
`

export const ButtonContainer = styled.div`
    width: 100%;
    height: 60px;
    border: 1px solid #eee;
    margin-top: 20px;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        width: 70px;
        height: 30px;
        background: #7159c1;
        border: none;
        color: #fff;
        border-radius: 20%;
        margin: auto;
        box-shadow: 1px 1px 5px #000;
    }
`
