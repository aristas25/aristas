import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryMedicalHistoryKey } from "../apis/queryKeys";
import { useMedicalHistoryQuery } from "../apis/api.users";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./common/Tabs";
import config from "../config";

export default function MedicalHistory() {
  const { userId } = useParams();
  const [selectedTab, setSelectedTab] = useState("comments");
  const {
    data: medicalHistory,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryMedicalHistoryKey(userId),
    queryFn: () => useMedicalHistoryQuery(userId),
  });

  if (isLoading) return <p className="p-4">Cargando historia clínica...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Historia Clínica</h1>
      <p className="text-gray-700 mb-4">Nombre: {medicalHistory?.name}</p>
      <div className="space-y-4">
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="flex flex-col items-center justify-center w-full"
        >
          <TabsList className="flex items-start justify-start col-span-1 h-full overflow-scroll w-full">
            <TabsTrigger
              value={"comments"}
              className="flex justify-center items-center w-full py-2 text-base border"
              primaryColor={config.theme.colors.primaryColor}
              textColor={config.theme.colors.textMenuColor}
              fill={true}
            >
              Comments
            </TabsTrigger>
            <TabsTrigger
              value={"links"}
              className="flex justify-center items-center w-full py-2 text-base border"
              primaryColor={config.theme.colors.primaryColor}
              textColor={config.theme.colors.textMenuColor}
              fill={true}
            >
              Links
            </TabsTrigger>
            <TabsTrigger
              value={"others"}
              className="flex justify-center items-center w-full py-2 text-base border"
              primaryColor={config.theme.colors.primaryColor}
              textColor={config.theme.colors.textMenuColor}
              fill={true}
            >
              Other
            </TabsTrigger>
          </TabsList>
          <div className="py-4 pl-2 col-span-2 h-full w-full">
            <TabsContent value={"comments"} key={"comments_id"}>
              <>
                <h4>Comments content</h4>
                <div className="flex flex-col gap-4">
                  {medicalHistory?.records.map((record, index) => (
                    <div
                      key={index}
                      className="border p-4 rounded shadow bg-white"
                    >
                      <h2 className="text-lg font-semibold mb-1">
                        {record.date}
                      </h2>
                      <p className="text-gray-700 whitespace-pre-line">
                        {record.notes}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            </TabsContent>
            <TabsContent value={"links"} key={"links_id"}>
              <>
                <h4>Comments content</h4>
                <div className="flex flex-col gap-4">
                  {medicalHistory?.links.map((link, index) => (
                    <div
                      key={index}
                      className="border p-4 rounded shadow bg-white"
                    >
                      <h2 className="text-lg font-semibold mb-1">
                        {link.date}
                      </h2>
                      <p className="text-gray-700 whitespace-pre-line">
                        {link.description}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            </TabsContent>
            <TabsContent value={"others"} key={"others_id"}>
              Other content
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
