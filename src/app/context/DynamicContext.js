import { createContext, useState } from "react";

export const DynamicContext = createContext();
export const DynamicProvider = ({ children }) => {
  const [candidateDetails, setCandidateDetails] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [createAccount, setCreateAccount] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchKey, setSearchKey] = useState("");
  const [pending, setPending] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [moreOptions, setMoreOptions] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [documentsCount, setDocumentsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  return (
    <DynamicContext.Provider
      value={{
        candidateDetails,
        setCandidateDetails,
        activeTab,
        setActiveTab,
        createAccount,
        setCreateAccount,
        verifyEmail,
        setVerifyEmail,
        showpopup,
        setshowpopup,
        currentPage,
        setCurrentPage,
        searchKey,
        setSearchKey,
        pending,
        setPending,
        selectedOption,
        setSelectedOption,
        moreOptions,
        setMoreOptions,
        dialogOpen,
        setDialogOpen,
        documentsCount,
        setDocumentsCount,
        rowsPerPage,
        setRowsPerPage,
        loading,
        setLoading,
        skeletonLoading,
        setSkeletonLoading,
      }}
    >
      {children}
    </DynamicContext.Provider>
  );
};
