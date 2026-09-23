import { useQuery } from "@tanstack/react-query";
import { post } from "@/api/client";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { Card, CardContent } from "@/components/ui/card";
import { unwrapList } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

export function PortalDataPage({
  title,
  description,
  path,
  queryKey,
  columns,
  buildBody,
  emptyTitle,
}) {
  const { user } = useAuth();
  const body = buildBody ? buildBody(user) : {};
  const list = useQuery({
    queryKey: [queryKey, body],
    queryFn: () => post(path, body),
    select: unwrapList,
  });

  return (
    <>
      <PageHeader title={title} description={description} />
      <Card>
        <CardContent className="p-0">
          <DataTable
            columns={columns}
            data={list.data}
            loading={list.isLoading}
            error={list.error}
            emptyTitle={emptyTitle}
          />
        </CardContent>
      </Card>
    </>
  );
}
