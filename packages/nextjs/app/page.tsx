"use client";

import React from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import type { NextPage } from "next";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "~~/components/proofscore/HomePage";
import Layout from "~~/components/proofscore/Layout";
import ReportPage from "~~/components/proofscore/ReportPage";

const Home: NextPage = () => {
  const { primaryWallet } = useDynamicContext();
  const connectedAddress = primaryWallet?.address;
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage connectedAddress={connectedAddress} />} />
          <Route path="/report/:address" element={<ReportPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default Home;
