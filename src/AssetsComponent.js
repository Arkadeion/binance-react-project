import { Link } from "react-router-dom";

export function AssetsComponent({ id, baseAsset, numberOfMarkets }) {

    return (
        <tr>
            <td>
                <Link to={`/markets?base_asset=${baseAsset}`} >{baseAsset}</Link>
            </td>
            <td>
                {numberOfMarkets}
            </td>
        </tr>
    )
}