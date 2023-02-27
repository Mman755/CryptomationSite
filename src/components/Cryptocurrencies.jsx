import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { useGetCryptosQuery } from "../Services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchCrypto, setCryptoSearch] = useState("");

  useEffect(() => {
    const filteredCryptos = cryptosList?.data?.coins.filter((cryptoCoin) =>
      cryptoCoin.name.toLowerCase().includes(searchCrypto.toLowerCase())
    );

    setCryptos(filteredCryptos);
  }, [cryptosList, searchCrypto]);

  if (isFetching) return "Loading...";

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Crypto Currencies"
            onChange={(e) => setCryptoSearch(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((cryptos) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={cryptos.uuid}
          >
            <Link to={`/crypto/${cryptos.uuid}`}>
              <Card
                title={`${cryptos.rank}. ${cryptos.name}`}
                extra={<img className="crypto-image" src={cryptos.iconUrl} />}
                hoverable
              >
                {" "}
                <p>Price: {millify(cryptos.price)}</p>{" "}
                <p>Market Cap: {millify(cryptos.marketCap)}</p>{" "}
                <p>Daily Change: {millify(cryptos.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
